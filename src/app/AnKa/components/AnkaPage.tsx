/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, ChangeEvent, useRef, useEffect } from 'react';
import { Box, Container, Divider, makeStyles, RootRef, Typography, Button } from '@material-ui/core';
import Reply, { parseContent, parseContents } from './Reply';
import { ID, SingleMessage, SingleAnkaElement, ankaElementTypesString, SingleMessageData } from 'anka-types';
import { user01_mockData, replies_mockData } from 'app/AnKa/storage/mockData';
import { scrollToBottom } from 'lib/fn';
import { UserInfo } from 'anka-types';
import { getRandomSingleAnkaEl, checkIsAnkaed, checkIsAnkaElementMatched } from '../fn';
import { ankaElementTypes, socket } from '../config';
import AnkaTextAreaContainer from '../containers/AnkaTextAreaContainer';
import SingleAnkaElementItem from './AnkaElement';
import { KeyboardArrowDown } from '@material-ui/icons';
import { useParams } from 'react-router';
import SinglePostItem from './SingleAnkaPost';


const getLatestAnkaHost = (messages: SingleMessage[], ankaHostId: ID): SingleMessage | undefined => {
  const hostMessages = messages.filter(mes => {
    return mes.userId === ankaHostId && mes.ankaElements.length > 0;
  });
  return hostMessages[hostMessages.length - 1];
};
const getLatestAnkaHostElementsTypes = (messages: SingleMessage[], ankaHostId: ID) => {
  const latestHostMessages = getLatestAnkaHost(messages, ankaHostId);
  if(latestHostMessages) {
    const { ankaElements } = latestHostMessages;
    return ankaElements;
  }
  return [];
};






const useStyles = makeStyles({
  mesContainer: {
    // position: 'relative',
    backgroundColor: '#eee',
    padding: 8,
    height: 400,
    overflowY: 'scroll',
  },
  arrowDown: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  }
});

export const Header = ({
  ankaHostId,
  latestAnkaHostEls,
}: {
  ankaHostId: ID
  latestAnkaHostEls: SingleAnkaElement[]
}) => {
  return (
    <>
      <Typography variant={'h4'}>
        {`Anka Host Id: ${ankaHostId}`}
      </Typography>
      <Box display={'flex'}>
        <Typography>
          {'latest anka host elements: '}
        </Typography>
        {latestAnkaHostEls.map((el, i) => (
          <SingleAnkaElementItem key={i} {...el} />
        ))}
      </Box>
    </>
  );
};



export type HostUsedAnkaElements = {
  type: ankaElementTypesString
}[]
export const initHostUsedAnkaElements: HostUsedAnkaElements = Object.keys(ankaElementTypes).map(t => ({
  type: t as ankaElementTypesString,
}));


export type AnkaPageProps = {
  userInfo?: UserInfo
  ankaPageId?: ID
  ankaHostId: ID
  queriedParsedMessages?: SingleMessage[]
}
const AnkaPage = (props: AnkaPageProps) => {
  const {
    userInfo=user01_mockData, 
    ankaPageId='1',
    ankaHostId, 
    queriedParsedMessages=[] 
  } = props;
  const classes = useStyles();
  const isAnkaHostInThisAnka = ankaHostId === userInfo.id;
  const replyRef = useRef<HTMLElement | null>();
  const setReplyRef = (el: HTMLElement | null) => {
    replyRef.current = el;
  };

  const [ankaIsFulfilled, setFulfilled] = useState(false);
  const [latestAnkaHostEls, setLatestEls] = useState<SingleAnkaElement[]>([]);
  const [ankaMatchedIds, setAnkaMatchedIds] = useState<ID[]>([]);
  const [messages, setMessages] = useState(queriedParsedMessages);

  const handleDownToBottom = () => {
    if(replyRef) {
      // console.log(replyRef.current);
      const el = replyRef.current;
      scrollToBottom(el);
    }
  };
  useEffect(() => {
    socket.emit('join', ankaPageId);
    socket.on('get_chat', (message: SingleMessage) => {
      console.log(message, 'socket get chat');
      setMessages(mes => [
        ...mes,
        message
      ]);
    });
  }, [ankaPageId]);
  useEffect(() => {
    //scroll to bottom
    handleDownToBottom();
    //check is anka reply now is fulfilled
    for (let i = 0; i < messages.length; i++) {
      const mes = messages[i];
      // if(checkIsAnkaed(messages, i)) 
      //   return setFulfilled(true);
      let latestAnkaHostElsNow = latestAnkaHostEls;
      const checkedLatestAnkaHostEls = getLatestAnkaHostElementsTypes(messages, ankaHostId);
      if(checkedLatestAnkaHostEls.length > 0) {
        latestAnkaHostElsNow = checkedLatestAnkaHostEls;
        setLatestEls(latestAnkaHostElsNow);
      }
      const checkResult = checkIsAnkaElementMatched(latestAnkaHostElsNow, mes);
      checkResult.matched && setAnkaMatchedIds(ids => [
        ...ids,
        checkResult.id
      ]);
    }
  }, [ankaHostId, latestAnkaHostEls, messages]);


  return (
    <Container>
      <Header {...props} latestAnkaHostEls={latestAnkaHostEls} />
      <Box position={'relative'}>
        
        <Box className={classes.mesContainer}>
          {/* just mock */}
          {ankaPageId && (
            <Reply {...replies_mockData[Number(ankaPageId) - 1]} isAnkaHost={true} />
          )}
          <Divider />
          <div ref={setReplyRef}>
            {messages.map((mes, i) => {
              const isAnkaHost = ankaHostId === mes.userId;
              const isAnkaed = !!ankaMatchedIds.find(id => id === mes.id);
              return (
                <Reply 
                  key={i}
                  {...mes}
                  isAnkaed={!isAnkaHost && isAnkaed} 
                  isAnkaHost={isAnkaHost} />
              );
            })}
          </div>
        </Box>
        <Button onClick={handleDownToBottom} className={classes.arrowDown}>
          <KeyboardArrowDown />
        </Button>
      </Box>
      <Divider />
      <AnkaTextAreaContainer 
        {...props}
        isAnkaHost={isAnkaHostInThisAnka}
        messages={messages}
        setMessagesFn={setMessages}
      />
    </Container>
  );
};

export const AnkaPageWithRouter = (props: AnkaPageProps) => {
  const { id: ankaPageId } = useParams();
  return (
    <AnkaPage {...props} ankaPageId={ankaPageId} />
  );
};


export const getParseMessagesFromQuery = (singleMessageData: SingleMessageData) => {
  const {
    parsedContent,
    ankaElements,
  } = parseContents(singleMessageData.content);
  return {
    ...singleMessageData,
    content: parsedContent,
    ankaElements,
  };
};

export const AnkaPageWithQuery = (props: AnkaPageProps) => {
  //mock queried data
  const messagesData = replies_mockData;
  const parsedMessages = messagesData.map(data => getParseMessagesFromQuery(data));
  return (
    <AnkaPageWithRouter 
      {...props} 
      queriedParsedMessages={parsedMessages} />
  );
};

export default AnkaPage;