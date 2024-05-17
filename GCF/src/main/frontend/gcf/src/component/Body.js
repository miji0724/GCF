import './Body.css';
import Carousel from './carousel/Carousel';
import Carousel2 from './carousel/Carousel2';
import banner1 from '../img/banner/배너1.jpg';
import banner2 from '../img/banner/배너2.png';
import banner3 from '../img/banner/배너3.png';
import banner4 from '../img/banner/배너4.jpg';
import banner5 from '../img/banner/배너5.jpg';
import off_poster1 from '../img/off_poster/off_poster1.jpg';
import off_poster2 from '../img/off_poster/off_poster2.jpg';
import off_poster3 from '../img/off_poster/off_poster3.jpg';
import off_poster4 from '../img/off_poster/off_poster4.jpg';
import printing_3D from '../img/on_poster/3dPrinting.jpg';
import illust from '../img/on_poster/Illust.jpg';
import contentsDesign from '../img/on_poster/ContentsDesign.jpg';
import contentsPlanning from '../img/on_poster/ContentsPlanning.jpg';
import art from '../img/off_home_icon/art_icon.png';
import science from '../img/off_home_icon/science_icon.png';
import music from '../img/off_home_icon/music_icon.png';
import design from '../img/off_home_icon/design_icon.png';
import study from '../img/off_home_icon/study_icon.png';
import etc from '../img/off_home_icon/etc_icon.png';
import React, { useState } from 'react';

const Body = () => {
    const images = [
        banner1,
        banner2,
        banner3
    ];

    const images2 = [
        banner4,
        banner5,
    ];

    const [selectedProgram, setSelectedProgram] = useState(1);

    const handleClick = (program) => {
        setSelectedProgram(program);
    };

    return (
        <div className="body">
            <div className="banner01">
                <Carousel className='banner' images={images} />
            </div>

            <ul className="button_notice">
                <li className="button01">
                    <a className="plan_button" href="/schedule">이달의 일정<div>⇀</div></a>
                    <a className="teacher_button" href="#">강사 등록<div>⇀</div></a>
                    <a className="issue_button" href="#">증명서 발급<div>⇀</div></a>
                </li>
                <li className="notice_space">
                    <li>
                        <div>공지사항</div>
                        <div><a href="/notice">더보기 →</a></div>
                    </li>
                    <li id='notice_content'>1번 공지사항입니다.</li>
                    <li id='notice_content'>2번 공지사항입니다.</li>
                    <li id='notice_content'>3번 공지사항입니다.</li>
                    <li id='notice_content'>4번 공지사항입니다.</li>
                </li>
            </ul>

            <div className="popular">
                <div id="home_title1">인기있는 오프라인 교육/체험</div>
                <ul className="popular_poster">
                    <li>
                        <a href='#'>
                            <img src={off_poster1}/>
                            <div className="off_category1">교육</div>
                            <div className="title1">2024 프로그램 제목</div>
                            <div className="date">2024.05.02~2024.05.14</div>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <img src={off_poster2}></img>
                            <div className="off_category1">교육</div>
                            <div className="title1">2024 프로그램 제목</div>
                            <div className="date">2024.05.02~2024.05.14</div>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <img src={off_poster3}></img>
                            <div className="off_category2">체험</div>
                            <div className="title1">2024 프로그램 제목</div>
                            <div className="date">2024.05.02~2024.05.14</div>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <img src={off_poster4}></img>
                            <div className="off_category2">체험</div>
                            <div className="title1">2024 프로그램 제목</div>
                            <div className="date">2024.05.02~2024.05.14</div>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="popular">
                <div id="home_title1">인기있는 온라인 교육/체험</div>
                <ul className="popular_poster">
                    <li>
                        <a href='#'>
                            <img src={printing_3D}/>
                            <div className="on_category1">디자인</div>
                            <div className="title1">2024 프로그램 제목</div>
                            <div className="date">2024.05.02~2024.05.14</div>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <img src={illust}></img>
                            <div className="on_category2">미술</div>
                            <div className="title1">2024 프로그램 제목</div>
                            <div className="date">2024.05.02~2024.05.14</div>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <img src={contentsDesign}></img>
                            <div className="on_category3">교육</div>
                            <div className="title1">2024 프로그램 제목</div>
                            <div className="date">2024.05.02~2024.05.14</div>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <img src={contentsPlanning}></img>
                            <div className="on_category3">교육</div>
                            <div className="title1">2024 프로그램 제목</div>
                            <div className="date">2024.05.02~2024.05.14</div>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="banner02">
                <Carousel2 className='banner' images={images2} />
            </div>

            <div className="new">
                <div className="home_title2">
                    <div>새로운 오프라인 교육/체험</div>
                    <div className="title2" onClick={() => handleClick(1)}>모담골 노는 학당</div>
                    <div className="title2" onClick={() => handleClick(2)}>2024 문화예술 프로그램</div>
                    <div className="title2" onClick={() => handleClick(3)}>2024 가족이 있는 플리마켓</div>
                    <div className="title2" onClick={() => handleClick(4)}>향기롭던 보구곶의 봄</div>
                    <div><a href="#">더보기 →</a></div>
                </div>
                <a href="#" className="new_center">
                    {selectedProgram && <img src={selectedProgram === 1 ? off_poster1 :
                                                selectedProgram === 2 ? off_poster2 :
                                                selectedProgram === 3 ? off_poster3 :
                                                selectedProgram === 4 ? off_poster4 :
                                                "" }
                                        />}

                    {selectedProgram && selectedProgram === 1 ? <div className="title1">2024 모담골 노는 학당[한옥 마을 교육 프로그램]</div> :
                                        selectedProgram === 2 ? <div className="title1">2024 문화예술 프로그램</div> :
                                        selectedProgram === 3 ? <div className="title1">2024 가족이 있는 플리마켓</div> :
                                        selectedProgram === 4 ? <div className="title1">향기롭던 보구곶의 봄[봄 전시 연계 프로그램]</div> : 
                                        ""}

                    <div className="date">2024.05.02~2024.05.14</div>
                </a>
                <div className="home_title3">
                    <div>새로운 온라인 교육/체험</div>
                    <div className="title2" onClick={() => handleClick(1)}>프로그램 제목</div>
                    <div className="title2" onClick={() => handleClick(2)}>프로그램 제목</div>
                    <div className="title2" onClick={() => handleClick(3)}>프로그램 제목</div>
                    <div className="title2" onClick={() => handleClick(4)}>프로그램 제목</div>
                    <div><a href="#">더보기 →</a></div>
                </div>
            </div>

            <div className="online_category">
                <div className="home_title4">
                    온라인 교육
                </div>
                <div className="icon">
                    <a href='#'>
                        <img src={art}></img>
                        <text>미술</text>
                    </a>
                    <a href='#'>
                        <img src={science}></img>
                        <text>과학</text>
                    </a>
                    <a href='#'>
                        <img src={music}></img>
                        <text>음악</text>
                    </a>
                    <a href='#'>
                        <img src={design}></img>
                        <text>디자인</text>
                    </a>
                    <a href='#'>
                        <img src={study}></img>
                        <text>교육</text>
                    </a>
                    <a href='#'>
                        <img src={etc}></img>
                        <text>기타</text>
                    </a>
                </div>
            </div>
        </div>

    
        
        
    );
}

export default Body;