import React from 'react';
import './Online_state.css';

function Online_state() {
    return (
        <div className='CenterContainer'>
          <div className='State_title'>온라인교육 수강현황</div>
          <div className='CenterMenuContainer'>
            <ul className='CenterMenu'>
              <li>전체</li>
              <li>수강중</li>
              <li>수강완료</li>
            </ul>
          </div>
          <div className='CenterLowMenuContainer'>
            <ul className='CenterLowMenu'>
              <li>번호</li>
              <li>카테고리</li>
              <li>교육명</li>
              <li>진도율</li>
              <li>교육시작일</li>
              <li>교육기간</li>
              <li>관리</li>
            </ul>
          </div>
        </div>
  );
}

export default Online_state;
