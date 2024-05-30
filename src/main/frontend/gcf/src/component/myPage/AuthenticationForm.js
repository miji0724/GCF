import React, { useState } from 'react';
import './AuthenticationForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthenticationForm() {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Submitting authentication request:', credentials);
      const response = await axios.post('http://localhost:8090/member/authentication', credentials, { withCredentials: true });
      console.log('Authentication response:', response);
      if (response.status === 200) {
        console.log('Authentication successful:', response.data);
        navigate('/mypage'); // 인증 후 마이페이지로 리디렉션
      } else {
        console.error('Authentication failed:', response.data);
        alert('인증 실패: 아이디 또는 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.error('Authentication request failed:', error.response ? error.response.data : error.message);
      alert('인증 실패: 아이디 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <div className="authentication-form-container">
      <div className="title">본인 인증</div>
      <div className="line"></div>
      <div className="authentication-form">
        <h2>회원 인증</h2>
        <h6>회원정보 확인을 위해 아이디와 비밀번호를 입력해주세요.</h6>
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
          <button type="submit">확인</button>
        </form>
      </div>
    </div>
  );
}

export default AuthenticationForm;
