/* eslint-disable no-lone-blocks */
import React from 'react';
import { Box, Typography } from '@material-ui/core';

//改成同一個頁面勾選餐點 不要分兩邊
const AddMealPanel = () => {
  return (
    <Box className={'addMeal-container clearfix'}>
      
    </Box>
  );
};

const SettingThreshold = () => {
  return (
    <Box className={'settingThreshold-container grid-12 clearfix'}>
      <Typography>
        {'設定此飯團的購物金人數門檻'}
      </Typography>
      <div className="setting grid-12 grid-md-6 clearfix">
        <h3>{'設定人數門檻(單位: 人)'}</h3>
        <div className="settingArea">
          <div id="minus" className="plusAndMinus grid-3">
            {'-'}
          </div>
          <div id="people" className="grid-6 people">
            {'10'} 
          </div>
          <div id="plus" className="plusAndMinus grid-3">
            {'+'}
          </div>
        </div>
      </div>
      <div id="bonus" className="bonus grid-12 grid-md-6">
        <h3 className="grid-12">{'達到後 前 '}
          <span className="people" id="people2">{'10'}</span>
          {'人每人可獲得:'}  
        </h3>
        <div className="bonus-container grid-12 clearfix">
          <div className="grid-4">
            <div className="pic">
              <img src="images/bonusIcon-05.svg" alt="bonus" />
              <span className="bonus-coin">{'99'}</span>
            </div>
          </div>
          <p className="grid-8">
            <span className="bonus" id="3_2Bonus">{'0'}</span>
            {'元購物金'}
          </p>
        </div>
      </div>
    </Box>
  );
};

const CreateGroupoonSelectMeal = () => {
  return (
    <Box>
      <Typography variant={'h4'}>{'選擇你想在此飯團加入的餐點'}</Typography>
      <AddMealPanel />
      <SettingThreshold />
    </Box>
  );
};

export default CreateGroupoonSelectMeal;
{/* <div class="maxWidthWrapper">
        <div class="step-container clearfix">
            <!-- 這裡放步驟 -->
            <h2>發起飯團!</h2>
            <ul class="step-wrapper clearfix">
                <li class="grid-4 active">
                    <span >
                        1
                    </span>
                    選擇開始日期
                </li>
                <li class="grid-4">
                    <span class="active">2<div class="decoLine"></div></span>
                    選擇餐點和人數
                </li>
                <li class="grid-4">
                    <span>3<div class="decoLine"></div></span>
                    確認發起日期
                </li>
            </ul>
        </div>
        <div class="woodTemp create3_2">
            <h1>選擇你想在此飯團加入的餐點</h1>
            <input type="checkbox" id="add-meal">
            <div class="addMeal-container clearfix">     
                <div class="addMealPanel grid-12 grid-md-7">
                    <h2> 選擇餐點分類</h2>
                    <ul class="clearfix" id="mealGenre-container">   
                        
                    </ul>
                    <div class="add-wrapper" id="addWrapper3_2">
                        
                    </div>
                    <label for="add-meal" class="checkMeal-btn">
                        確認選擇這些餐點
                    </label>
                </div>
                <label for="add-meal" class="checkMeal-bg"></label>
                <div class="mealPointer">
                    <!-- <h3>從左側的餐點，<br>拖拉至右邊以新增餐點~</h3> -->
                    <div class="pic">
                        <img src="images/spoonFork-01.svg" alt="">
                    </div>
                </div>
                <div class="addedList grid-12 grid-md-5 clearfix">
                    <div class="grouponDate">
                        <h3>
                            購物金募集時間: 
                        </h3>
                        <span class="grouponDay">0</span>天
                    </div>
                    <div class="mealArea" id="mealArea">
                        <p id="mealAreaInfo">尚未有任何餐點<br>
                            您可以在左側的餐點列表<br>，在各個餐點點擊"+"，以新增餐點~
                        </p>
                        
                    </div>
                    <div class="grouponDetail">
                        <div class="mealCountNow grid-3">
                            <span id="addedMealNow">0</span>
                            餐
                        </div>
                        <div class="originalPrice grid-2">
                            <span>原價: </span>
                            <span id="originPrice">0</span>
                        </div>
                        <div class="salePrice grid-7">
                            <span>飯團價: </span>
                            <span id="salePrice">0</span>
                                元( <span id="saleCount">6</span>折)
                        </div>
                    </div>
                    <label for="add-meal" class="addMeal-btn">
                        +
                    </label>
                </div>
            </div>
        </div>
        <div class="settingThreshold-container grid-12 clearfix">
            <h2>
                設定此飯團的購物金人數門檻
            </h2>
            <div class="setting grid-12 grid-md-6 clearfix">
                <h3>設定人數門檻(單位: 人)</h3>
                <div class="settingArea">
                    <div id="minus" class="plusAndMinus grid-3">
                        -
                    </div>
                    <div id="people" class="grid-6 people">
                        10 
                    </div>
                    <div id="plus" class="plusAndMinus grid-3">
                        +
                    </div>
                </div>
            </div>
            <div id="bonus" class="bonus grid-12 grid-md-6">
                <!-- <h3>
                    達成後可獲得的購物金，達成門檻的前 <span id="people2"> 10 </span> 人可獲得  
                </h3>
                <p>
                    <span id="3_2Bonus">
                        0
                    </span>
                    元購物金
                </p> -->
                <h3 class="grid-12">達到後 前 
                        <span class="people" id="people2">10</span>
                        人每人可獲得:  
                    </h3>
                <div class="bonus-container grid-12 clearfix">
                    <div class="grid-4">
                        <div class="pic">
                            <img src="images/bonusIcon-05.svg" alt="bonus">
                            <span class="bonus-coin">99</span>
                        </div>
                    </div>
                    <p class="grid-8">
                        <span class="bonus" id="3_2Bonus">0</span>
                        元購物金
                    </p>
                </div>
            </div>
        </div>
        <div class="btn-container clearfix">
            <a class="cancelBTN" href="3-1_createGroupon.php">
                回上一步
            </a>
           <a class="nextBTN" id="next3_2">
               確認並繼續
           </a>
        </div>
    </div> */}