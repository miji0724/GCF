import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Offline_state.css';
import LeftMenuBar_teacher from './LeftMenuBar_teacher';

function Offline_state() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // 백엔드의 API 엔드포인트에서 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/applications'); // 예시: 신청 현황을 가져오는 API 엔드포인트
        setApplications(response.data); // 받아온 데이터를 applications 상태에 저장
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 함수 호출
  }, []); // useEffect를 이용하여 컴포넌트가 렌더링될 때 한 번만 호출되도록 설정

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
