import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeftMenuBar_teacher from "../../component/myPage/LeftMenuBar_teacher";
import './MyPage.css';

const MyPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/member/myinfo', { withCredentials: true });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MyPage">
      <LeftMenuBar_teacher />
    </div>
  );
}

export default MyPage;