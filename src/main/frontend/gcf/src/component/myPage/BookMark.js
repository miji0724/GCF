import React from 'react';
import './BookMark.css';

function BookMark() {
  return (
    <div className='All'>
      <div className='boCenterContainer'>
        <div className='OnlineState'>관심 교육/체험</div>
          <div className='CenterMenuContainer' id="bookMark_center_menu">
            <ul className='CenterMenu'>
              <li>교육/체험</li>
              <li>온라인 교육</li>
            </ul>
          </div>
        </div>
      </div>
  );
}

export default BookMark;
