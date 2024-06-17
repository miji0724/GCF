import './Header.css';
import logo from '../img/logo.png';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout, userId}) =>  {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);

  const navigate = useNavigate();
  
  const gotoOnlineListCategory = (category) => {
    navigate(`/OnlineList/${category}`); // 카테고리별 필터 기능
  };
  
  const isManager = userId === "manager12";

  return (
    <header>
      <div className="top_header">
        <div className="logo">
          <a href="/"><img src={logo} alt="Logo" /></a>
        </div>
        <div className="member_btns">
          {isLoggedIn ? (
            <>
              <a onClick={onLogout}>로그아웃</a> |
              <a href="/MyAuthenticationForm">마이페이지</a>
              {isManager && (
                <>
                  <span>|</span>
                  <a href="/manage">관리자페이지</a>
                </>
              )}
            </>
          ) : (
            <>
              <a href="/login">로그인</a> |
              <a href="/signUp">회원가입</a>
            </>
          )}
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
            <Link to="/OnlineList/음악">온라인 교육</Link>
            {isActive2 && (
              <ul className="dropdown">
                <li><a onClick={() => gotoOnlineListCategory('음악')}>음악</a></li>
                <li><a onClick={() => gotoOnlineListCategory('미술')}>미술</a></li>
                <li><a onClick={() => gotoOnlineListCategory('과학')}>과학</a></li>
                <li><a onClick={() => gotoOnlineListCategory('디자인')}>디자인</a></li>
                <li><a onClick={() => gotoOnlineListCategory('교육')}>교육</a></li>
                <li><a onClick={() => gotoOnlineListCategory('기타')}>기타</a></li>
              </ul>
            )}
          </li>
          <li><a href="/notice">공지사항</a></li>
          <li onMouseEnter={() => setIsActive3(true)} 
              onMouseLeave={() => setIsActive3(false)}
          >
            <Link to="/map/김포아트홀">
              찾아오시는 길
              {isActive3 && (
                <ul className="dropdown">
                  <li><Link to="/map/김포아트홀">김포아트홀</Link></li>
                  <li><Link to="/map/김포아트빌리지%20한옥마을">김포아트빌리지 한옥마을</Link></li>
                  <li><Link to="/map/김포아트빌리지">김포아트빌리지</Link></li>
                  <li><Link to="/map/통진두레%20문화센터">통진두레 문화센터</Link></li>
                  <li><Link to="/map/김포국제조각공원">김포국제조각공원</Link></li>
                  <li><Link to="/map/월곶생활문화센터">월곶생활문화센터</Link></li>
                  <li><Link to="/map/김포평화문화관">김포평화문화관</Link></li>
                  <li><Link to="/map/작은미술관%20보구곶">작은미술관 보구곶</Link></li>
                  <li><Link to="/map/애기봉평화생태공원">애기봉평화생태공원</Link></li>
                </ul>
              )}
            </Link>
          </li>
          <li>
            {isLoggedIn && (
            <div className='hello'>
              "{userId}" 님 안녕하세요! 🌷
            </div>
            )}
            {!isLoggedIn && (
            <div className='hello'>
              반가워요 🙌
            </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}


export default Header;
