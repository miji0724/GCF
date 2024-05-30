import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthenticationForm.css';
import axios from 'axios';

function AuthenticationForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/member/authentication", { password })
      .then(response => {
          navigate('/MyPage');
      })
      .catch(error => {
          setError('비밀번호가 일치하지 않습니다.');
      });
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
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default AuthenticationForm;
