import React from 'react';
import './Comment.css';

function Comment() {
  return (
    <div className='All' style={{ fontFamily: '"Noto Sans KR", sans-serif' }} >
      <div className='CenterContainer'>
        <div className='State_title'>작성 댓글</div>
          <div className='CenterMenuContainer'>
            <ul className='CenterMenu'>
              <li>번호</li>
              <li>작성일</li>
              <li>댓글내용</li>
              <li>답글여부</li>
            </ul>
          </div>
        </div>
      </div>
  );
}

export default Comment;
