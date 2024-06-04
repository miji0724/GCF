import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './AuthenticationForm.css';

function AuthenticationForm() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8090/member/authentication', { password }, { withCredentials: true });
      if (response.status === 200) {
        alert('본인확인이 완료됐습니다.');
        const urlParams = new URLSearchParams(location.search);
        const component = urlParams.get('component');
        navigate(`/MyPage${component ? `?component=${component}` : ''}`);
      } else {
        alert('실패했습니다.');
      }
    } catch (error) {
      alert('실패했습니다.');
    }
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