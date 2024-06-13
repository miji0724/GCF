import React from 'react';
import './ClassList.css';
import { Link } from 'react-router-dom';

function ClassList() {
  return (
    <div className='All' style={{ fontFamily: '"Noto Sans KR", sans-serif' }} >
      <div className='CenterContainer'>
        <div className='OnlineState'>강의등록 신청서</div>
        <div className='CenterMenuContainer'>
                <h3>강의 등록 신청 현황</h3>
            </div>
            <div className='CenterLowMenuContainer'>
              <ul className='CenterLowMenu'>
                <li><a href='번호'>번호</a></li>
                <li><a href='승인여부'>승인여부</a></li>
                <li><a href='프로그램명'>프로그램명</a></li>
                <li><a href='기간'>기간</a></li>
                <li><a href='온라인/오프라인'>온라인/오프라인</a></li>
                <li><a href='수강생 보기'>수강생 보기</a></li>
                <li><a href='댓글'>댓글</a></li>
                <li><a href='좋아요'>좋아요</a></li>
                <li><a href='조회수'>조회수</a></li>
                <li><a href='수정'>수정</a></li>
                <li><a href='삭제'>삭제</a></li>
              </ul>
            </div>
            <div className="ClassListButtonContainer">
              <Link to="/MyPageClassForm">
                <button className="WhiteButton">강의 개설하기</button>
              </Link>
            </div>
          </div>
        </div>
        
  );
}

export default ClassList;