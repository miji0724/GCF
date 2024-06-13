import React, { useState, useEffect } from 'react';
import Offline_state from './Offline_state';
import Online_state from './Online_state';
import BookMark from './BookMark';
import Comment from './Comment';
import TeacherForm from './TeacherForm';
import ClassForm from './ClassForm';
import MyPageSignUpForm from './MyPageSignUpForm';
import './LeftMenuBar_teacher.css';

function LeftMenuBar_teacher() {
  const [activeComponent, setActiveComponent] = useState('offline_state');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const component = urlParams.get('component');
    if (component) {
      setActiveComponent(component);
    }
  }, []);

  const handleLinkClick = (componentName) => {
    window.location.href = `/MyPage?component=${componentName}`;
  };

  const handleAuthRedirect = (componentName) => {
    window.location.href = `/MyPage?component=${componentName}`;
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
            <li><button onClick={() => handleAuthRedirect('teacher_register')}>강사 등록 신청</button></li>
            <li><button onClick={() => handleLinkClick('class_register')}>강의 등록 신청</button></li>
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
        {activeComponent === 'info_update' && <MyPageSignUpForm />}
      </div>
    </div>
  );
}

export default LeftMenuBar_teacher;