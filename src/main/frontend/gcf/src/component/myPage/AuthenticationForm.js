import React, { useState } from 'react';
import axios from 'axios';
import './AuthenticationForm.css';

function AuthenticationForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/MyPageAuthenticate', {
        password: password
      });
      
      // 성공적으로 인증되었을 때
      if (response.data === "인증 성공") {
        // 인증 성공 후 원하는 동작 수행
        window.location.href = 'http://localhost:3000/MyPage';
      } else {
        setError(response.data);
      }
    } catch (error) {
      setError('인증 실패: 서버 오류');
    }
  };

  return (
    <div className="authentication-form-container">
      <div className="title">회원인증</div>
      <div className="line"></div>
      <div className="authentication-form">
        <h2>회원 인증</h2>
        <h6>회원정보 확인을 위해 사용자 ID와 비밀번호를 입력해주세요.</h6>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">인증하기</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default AuthenticationForm;
