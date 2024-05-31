import React from 'react';
import './Offline_state.css';

function Offline_state() {
  return (
    <div className='All'>
      <div className='CenterContainer'>
        <div className='State_title'>교육/체험 신청현황</div>
        <div className='CenterMenuContainer'>
          <ul className='CenterMenu'>
            <li>전체</li>
            <li>승인</li>
            <li>신청실패</li>
            <li>신청취소</li>
          </ul>
        </div>
        <div className="CenterLowMenuContainer">
          <ul className="CenterLowMenu">
            <li>번호</li>
            <li>구분</li>
            <li>교육·체험명 / 상세 프로그램명</li>
            <li>운영기간</li>
            <li>승인여부</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Offline_state;