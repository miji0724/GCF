import React, { useState } from 'react';
import './AuthenticationForm.css';

function AuthenticationForm() {
  const [password, setPassword] = useState('');
  // setIsLogin 변수는 사용하지 않으므로 제거합니다.

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Password:', password);
  };

  return (
    <div className="authentication-form-container">
      <div className="title">회원인증</div>
      <div className="line"></div>
      <div className="authentication-form">
        <h2>회원 인증</h2>
        <h6>회원정보 확인을 위해 비밀번호를 입력해주세요.</h6>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">인증하기</button>
        </form>
      </div>
    </div>
  );
}

export default AuthenticationForm;
