import './Header.css';
import logo from '../img/logo.png';
import search from '../img/search.png';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const navigate = useNavigate();

  const gotoOnlineListCategory = (category) => {
    navigate(`/OnlineList/${category}`); // 카테고리별 필터 기능
  };

  return (
    <header>
      <div className="top_header">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Logo" /></Link>
        </div>
        <div className="member_btns">
          <div>
            <Link to="/login">로그인</Link> |
            <Link to="/signUp">회원가입</Link> |
            <Link to="/MyAuthentication">마이페이지 인증</Link> |
            <Link to="/MyPage">마이페이지</Link> |
            <Link to="/manage">관리자 페이지</Link>
          </div>
        </div>
      </div>
      <nav className="navigation">
        <ul>
          <li onMouseEnter={() => setIsActive(true)}
              onMouseLeave={() => setIsActive(false)}
          >
            <Link to="/OfflineList">오프라인 교육/체험</Link>
            {isActive && (
              <ul className="dropdown">
                <li><Link to="/schedule">이달의 일정</Link></li>
                <li><Link to="/OfflineList">프로그램 신청</Link></li>
              </ul>
            )}
          </li>
          <li onMouseEnter={() => setIsActive2(true)}
              onMouseLeave={() => setIsActive2(false)}>
            <Link to="/OnlineList">온라인 교육</Link>
            {isActive2 && (
              <ul className="dropdown">
                <li><Link to="#" onClick={() => gotoOnlineListCategory('음악')}>음악</Link></li>
                <li><Link to="#" onClick={() => gotoOnlineListCategory('미술')}>미술</Link></li>
                <li><Link to="#" onClick={() => gotoOnlineListCategory('과학')}>과학</Link></li>
                <li><Link to="#" onClick={() => gotoOnlineListCategory('디자인')}>디자인</Link></li>
                <li><Link to="#" onClick={() => gotoOnlineListCategory('교육')}>교육</Link></li>
                <li><Link to="#" onClick={() => gotoOnlineListCategory('기타')}>기타</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/notice">공지사항</Link></li>
          <li onMouseEnter={() => setIsActive3(true)}
              onMouseLeave={() => setIsActive3(false)}
          >
            <Link to="/map">찾아오시는 길</Link>
            {isActive3 && (
              <ul className="dropdown">
                <li><Link to="#">김포 아트홀</Link></li>
                <li><Link to="#">김포 아트빌리지 한옥마을</Link></li>
                <li><Link to="#">김포아트빌리지</Link></li>
                <li><Link to="#">통진두레 문화센터</Link></li>
                <li><Link to="#">김포국제조각공원</Link></li>
                <li><Link to="#">월곶생활문화센터</Link></li>
                <li><Link to="#">김포평화문화관</Link></li>
                <li><Link to="#">작은미술관 보구곶</Link></li>
                <li><Link to="#">애기봉평화생태공원</Link></li>
              </ul>
            )}
          </li>
          <li>
            <div className='search_bar'>
              <input />
              <button className="submit" type="submit"><img src={search} alt="Search" /></button>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
