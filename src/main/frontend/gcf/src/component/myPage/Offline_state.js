import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Offline_state.css';

function Offline_state() {
  const [programs, setPrograms] = useState([]);
  const [selectedState, setSelectedState] = useState('전체');

  useEffect(() => {
    let url = '/api/offProgram';
    if (selectedState !== '전체') {
      url = `/api/offPrograms/by-approval-state?approvalState=${selectedState}`;
    }

    axios.get(url)
      .then(response => {
        setPrograms(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the programs!", error);
      });
  }, [selectedState]);

  return (
    <div className='All'>
      <div className='CenterContainer'>
        <div className='State_title'>교육/체험 신청현황</div>
        <div className='CenterMenuContainer'>
          <ul className='CenterMenu'>
            <li onClick={() => setSelectedState('전체')}>전체</li>
            <li onClick={() => setSelectedState('승인')}>승인</li>
            <li onClick={() => setSelectedState('신청실패')}>신청실패</li>
            <li onClick={() => setSelectedState('신청취소')}>신청취소</li>
          </ul>
        </div>
        <div className="TableContainer">
          <table className="ProgramTable">
            <thead>
              <tr>
                <th>번호</th>
                <th>구분</th>
                <th>교육·체험명 / 상세 프로그램명</th>
                <th>운영기간</th>
                <th>승인여부</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program, index) => (
                <tr key={program.id} className="ProgramItem">
                  <td>{program.id}</td>
                  <td>{program.category}</td>
                  <td>{program.programName} / {program.programDetailName}</td>
                  <td>{program.operatingStartDay} ~ {program.operatingEndDay}</td>
                  <td>{program.approvalState}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Offline_state;
