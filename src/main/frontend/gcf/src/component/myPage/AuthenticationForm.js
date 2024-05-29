import React, { useState } from 'react';
import './AuthenticationForm.css';
import axios from 'axios';

function AuthenticationForm() {
  const [credentials, setCredentials] = useState({ id: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8090/member/login', credentials, {
        withCredentials: true,
      });
      console.log('Login successful:', response.data);
      window.location.href = '/mypage'; // 로그인 후 마이페이지로 리디렉션
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
    }
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
              name="id"
              value={credentials.id}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            비밀번호
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}

export default AuthenticationForm;
