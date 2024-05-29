import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeftMenuBar_teacher from "../../component/myPage/LeftMenuBar_teacher";
import './MyPage.css';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8090/member/info', {
          withCredentials: true,
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        alert('사용자 정보를 불러오는데 실패했습니다. 다시 로그인해 주세요.');
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="MyPage">
      <LeftMenuBar_teacher />
      {userInfo ? (
        <div className="userInfo">
          <h1>My Page</h1>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyPage;
