import React, { useState } from 'react';
import Offline_state from './Offline_state';
import Online_state from './Online_state';
import BookMark from './BookMark';
import Comment from './Comment';
import TeacherForm from './TeacherForm';
import ClassForm from './ClassForm';
import Certification from './Certification';
import MyPageSignUpForm from './MyPageSignUpForm';
import './LeftMenuBar_teacher.css';

function LeftMenuBar_teacher() {
  const [activeComponent, setActiveComponent] = useState('offline_state');

  const handleLinkClick = (componentName) => {
      setActiveComponent(componentName);
  };
  
  return (
    <div className="MyPage_body">
      <div className="MyPage_left">
        <div className="MyPageTitle" id="MyPage_title">마이페이지</div>
        <div className="MyPageSubtitle" id="MyPage_title">
          <ul className="MenuList">
            <div className='hinfo'><li>회원정보</li></div>
            <li><button onClick={() => handleLinkClick('offline_state')}>교육/체험 신청현황</button></li>
            <li><button onClick={() => handleLinkClick('online_state')}>온라인교육 수강현황</button></li>
            <li><button onClick={() => handleLinkClick('bookmark')}>관심 교육/체험</button></li>
            <li><button onClick={() => handleLinkClick('comment')}>작성댓글</button></li>
            <li><button onClick={() => handleLinkClick('teacher_register')}>강사 등록 신청</button></li>
            <li><button onClick={() => handleLinkClick('class_register')}>강의 등록 신청</button></li>
            <li><button onClick={() => handleLinkClick('certification')}>증명서 발급</button></li>
            <li><button onClick={() => handleLinkClick('info_update')}>정보수정</button></li>
          </ul>
        </div>
      </div>
      <div className="MyPage_right">
        {activeComponent === 'offline_state' && <Offline_state />}
        {activeComponent === 'online_state' && <Online_state />}
        {activeComponent === 'bookmark' && <BookMark />}
        {activeComponent === 'comment' && <Comment />}
        {activeComponent === 'teacher_register' && <TeacherForm />}
        {activeComponent === 'class_register' && <ClassForm />}
        {activeComponent === 'certification' && <Certification />}
        {activeComponent === 'info_update' && <MyPageSignUpForm />}
      </div>
    </div>
  );
}

export default LeftMenuBar_teacher;
