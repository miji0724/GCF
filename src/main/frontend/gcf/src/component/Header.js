import './Header.css';
import logo from '../img/logo.png';
import search from '../img/search.png';
import React, { useState } from 'react';

const Header = ({ isLoggedIn, onLogout }) =>  {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);

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
              <a href="/MyPageAuthenticationForm">마이페이지</a>
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
            <a href="#">오프라인 교육/체험
              {isActive && (
                <ul className="dropdown">
                  <li><a href="/schedule">이달의 일정</a></li>
                  <li><a href="#">프로그램 신청</a></li>
                </ul>
              )}
            </a>
          </li>
          <li onMouseEnter={() => setIsActive2(true)} 
              onMouseLeave={() => setIsActive2(false)}>
            <a href="#">
              온라인 교육
              {isActive2 && (
                <ul className="dropdown">
                  <li><a href="#">음악</a></li>
                  <li><a href="#">미술</a></li>
                  <li><a href="#">과학</a></li>
                  <li><a href="#">디자인</a></li>
                  <li><a href="#">교육</a></li>
                  <li><a href="#">기타</a></li>
                </ul>
              )}
            </a>
          </li>
          <li><a href="/notice">공지사항</a></li>
          <li onMouseEnter={() => setIsActive3(true)} 
              onMouseLeave={() => setIsActive3(false)}
          >
            <a href="/map">
              찾아오시는 길
              {isActive3 && (
                <ul className="dropdown">
                  <li><a>김포 아트홀</a></li>
                  <li><a>김포 아트빌리지 한옥마을</a></li>
                  <li><a>김포아트빌리지</a></li>
                  <li><a>통진두레 문화센터</a></li>
                  <li><a>김포국제조각공원</a></li>
                  <li><a>월곶생활문화센터</a></li>
                  <li><a>김포평화문화관</a></li>
                  <li><a>작은미술관 보구곶</a></li>
                  <li><a>애기봉평화생태공원</a></li>
                </ul>
              )}
            </a>
          </li>
          <li>
            {/* <div className='search_bar'>
              <input />
              <button className="submit" type="submit"><img src={search} alt="Search" /></button>
            </div> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}


export default Header;