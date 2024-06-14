import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Online_state.css';

function Online_state() {
  const [programs, setPrograms] = useState([]);
  const [selectedState, setSelectedState] = useState('전체');

  useEffect(() => {
    let url = '/api/onProgram';
    if (selectedState !== '전체') {
      url = `/api/onPrograms/by-status?status=${selectedState}`;
    }

    axios.get(url)
      .then(response => {
        setPrograms(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the programs!", error);
      });
  }, [selectedState]);

  return (
    <div className='CenterContainer'>
      <div className='State_title'>온라인교육 수강현황</div>
      <div className='CenterMenuContainer'>
        <ul className='CenterMenu'>
          <li onClick={() => setSelectedState('전체')}>전체</li>
          <li onClick={() => setSelectedState('수강중')}>수강중</li>
          <li onClick={() => setSelectedState('수강완료')}>수강완료</li>
        </ul>
      </div>
      <div className="TableContainer">
        <table className="ProgramTable">
          <thead>
            <tr>
              <th>번호</th>
              <th>카테고리</th>
              <th>교육명</th>
              <th>진도율</th>
              <th>교육시작일</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program, index) => (
              <tr key={program.id} className="ProgramItem">
                <td>{program.id}</td>
                <td>{program.category}</td>
                <td>{program.programName}</td>
                <td>{program.progress}</td>
                <td>{program.operatingStartDay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Online_state;