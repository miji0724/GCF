import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Online_state.css';

function Online_state() {
  const [programs, setPrograms] = useState([]);
  const [selectedState, setSelectedState] = useState('전체');

  useEffect(() => {
    let url = '/api/onProgram/myonprogram';
    if (selectedState !== '전체') {
      url = `/api/onProgram/by-approval-state?approvalState=${selectedState}`;
    }
  
    axios.get(url)
      .then(response => {
        console.log('Response data:', response.data); // 응답 데이터 확인
        setPrograms(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the programs!", error);
      });
  }, [selectedState]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='CenterContainer'>
      <div className='State_title'>온라인교육 수강현황</div>
      <div className='CenterMenuContainer'>
        <ul className='CenterMenu'>
          <li className={selectedState === '전체' ? 'active' : ''} onClick={() => setSelectedState('전체')}>전체</li>
          <li className={selectedState === '수강중' ? 'active' : ''} onClick={() => setSelectedState('수강중')}>수강중</li>
          <li className={selectedState === '수강완료' ? 'active' : ''} onClick={() => setSelectedState('수강완료')}>수강완료</li>
        </ul>
      </div>
      <div className="TableContainer">
        <table className="ProgramTable">
          <thead>
            <tr>
              <th>번호</th>
              <th>카테고리</th>
              <th>교육명</th>
              <th>교육시작일</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program, index) => (
              <tr key={program.id} className="ProgramItem">
                <td>{index + 1}</td>
                <td>{program.category}</td>
                <td>{program.programName}</td>
                <td>{formatDate(program.operatingStartDay)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Online_state;
