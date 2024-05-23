import React, { useState } from 'react';
import './AuthenticationForm.css';

function AuthenticationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // 로그인 상태를 관리하는 상태

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/member/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: username, password: password }),
      });

      if (response.ok) {
        // 서버로부터 응답이 성공적으로 받아졌을 때
        const user = await response.json();
        // 본인 인증 완료를 알리는 알림창을 띄우기
        alert('본인 인증이 완료되었습니다.');
        // 로그인 상태 변경 및 마이페이지로 이동
        setLoggedIn(true);
        redirectToMyPage();
      } else {
        // 서버로부터 응답이 오류인 경우
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      // 네트워크 오류 등의 예외 처리
      console.error('로그인 요청 에러:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  const redirectToMyPage = () => {
    // 마이페이지로 이동하는 함수
    window.location.href = '/mypage'; // 마이페이지 URL로 이동
  };

  return (
    <div className="authentication-form-container">
      <div className="title">본인 인증</div>
      <div className="line"></div>
      <div className="authentication-form">
        <h2>회원 인증</h2>
        <h6>회원정보 확인을 위해 비밀번호를 입력해주세요.</h6>
        <form onSubmit={handleSubmit}>
          <label>
            아이디
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            비밀번호
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">로그인</button>
        </form>
      </div>
      {loggedIn && <button onClick={redirectToMyPage}>마이페이지로 이동</button>}
    </div>
  );
}

export default AuthenticationForm;
