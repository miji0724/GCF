import React, { useState, useEffect } from 'react';
import Offline_state from './Offline_state';
import BookMark from './BookMark';
import Comment from './Comment';
import TeacherForm from './TeacherForm';
import ClassForm from './ClassForm';
import MyPageSignUpForm from './MyPageSignUpForm';
import axios from 'axios';
import './LeftMenuBar_teacher.css';

function LeftMenuBar_teacher() {
  const [activeComponent, setActiveComponent] = useState('offline_state');
  const [userState, setUserState] = useState('');
  const [teacherState, setTeacherState] = useState('');

  const getTeacherState = async () => {
    try {
      const response = await axios.get('/teacher/getTeacherApprovalState', {
        withCredentials: true,
        method: 'GET'
      });
      setTeacherState(response.data);
    } catch (error) {
      console.error("사용자 데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  const getUserState = async () => {
    try {
      const response = await axios.get('/member/getUserRole', {
        withCredentials: true,
        method: 'GET' 
      });
      setUserState(response.data);
    } catch (error) {
      console.error("사용자 데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const component = urlParams.get('component');
    if (component) {
      setActiveComponent(component);
    }
    getUserState();
  }, []);

  useEffect(() => {
    if (userState === 'TEACHER', 'ADMIN') {
      getTeacherState(); 
    }
  }, [userState]); 


  const handleLinkClick = (componentName) => {
    window.location.href = `/MyPage?component=${componentName}`;
  };

  const handleAuthRedirect = (componentName) => {
    if (teacherState === '승인') {
      window.location.href = `/MyPage?component=${componentName}`;
    } else {
      if(userState ==='USER'){
        alert('강사가 아닌 회원은 접근할 수 없습니다.');
      }
      alert('강사 승인이 되지 않아 접근할 수 없습니다.');
    }
  };

  return (
    <div className="MyPage_body">
      <div className="MyPage_left">
        <div className="MyPageTitle" id="MyPage_title">마이페이지</div>
        <div className="MyPageSubtitle" id="MyPage_title">
          <ul className="MenuList">
            <div className='hinfo'><p id='member_info_sidebar_title'>회원정보</p></div>
            <li><button onClick={() => handleLinkClick('offline_state')}>교육/체험 신청현황</button></li>
            <li><button onClick={() => handleLinkClick('bookmark')}>관심 교육/체험</button></li>
            <li><button onClick={() => handleLinkClick('comment')}>작성댓글</button></li>
            <li><button onClick={() => handleLinkClick('teacher_register')}>강사 등록 신청</button></li>
            <li><button onClick={() => handleAuthRedirect('class_register')}>강의 등록 신청</button></li>
            <li><button onClick={() => handleLinkClick('info_update')}>정보수정</button></li>
          </ul>
        </div>
      </div>
      <div className="MyPage_right">
        {activeComponent === 'offline_state' && <Offline_state />}
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