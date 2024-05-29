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
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    const [notices, setNotices] = useState([]);

    const handleClick = (program) => {
        setSelectedProgram(program);
    };

    useEffect(() => {
        axios.get('/home/notices')
            .then(response => {
                const sortedNotices = response.data.slice(0, 4); // 이미 정렬된 데이터 사용
                setNotices(sortedNotices);
            })
            .catch(error => {
                console.error('Failed to fetch notices', error);
            });
    }, []);

    const renderProgramContent = (program) => {
        switch (program) {
            case 1:
                return { img: off_poster1, title: '2024 모담골 노는 학당[한옥 마을 교육 프로그램]' };
            case 2:
                return { img: off_poster2, title: '2024 문화예술 프로그램' };
            case 3:
                return { img: off_poster3, title: '2024 가족이 있는 플리마켓' };
            case 4:
                return { img: off_poster4, title: '향기롭던 보구곶의 봄[봄 전시 연계 프로그램]' };
            default:
                return {};
        }
    };

    const selectedProgramContent = renderProgramContent(selectedProgram);

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
                    <div>
                        <span>공지사항</span>
                        <span><a href="/notice">더보기 →</a></span>
                    </div>
                    {notices.map(notice => (
                    <li key={notice.id} id='notice_content' onClick={() => window.location.href=`/notice/${notice.id}`}>
                        {notice.title}
                    </li>
                    ))}
                </li>
            </ul>

            <div className="popular">
                <div id="home_title1">인기있는 오프라인 교육/체험</div>
                <ul className="popular_poster">
                    {[off_poster1, off_poster2, off_poster3, off_poster4].map((poster, index) => (
                        <li key={index}>
                            <a href='#'>
                                <img src={poster} alt={`Poster ${index + 1}`} />
                                <div className="off_category">교육</div>
                                <div className="title1">2024 프로그램 제목</div>
                                <div className="date">2024.05.02~2024.05.14</div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="popular">
                <div id="home_title1">인기있는 온라인 교육/체험</div>
                <ul className="popular_poster">
                    {[printing_3D, illust, contentsDesign, contentsPlanning].map((poster, index) => (
                        <li key={index}>
                            <a href='#'>
                                <img src={poster} alt={`Poster ${index + 1}`} />
                                <div className="on_category">교육</div>
                                <div className="title1">2024 프로그램 제목</div>
                                <div className="date">2024.05.02~2024.05.14</div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="banner02">
                <Carousel2 className='banner' images={images2} />
            </div>

            <div className="new">
                <div className="home_title2">
                    <div>새로운 오프라인 교육/체험</div>
                    {['모담골 노는 학당', '2024 문화예술 프로그램', '2024 가족이 있는 플리마켓', '향기롭던 보구곶의 봄'].map((title, index) => (
                        <div key={index} className="title2" onClick={() => handleClick(index + 1)}>{title}</div>
                    ))}
                    <div><a href="#">더보기 →</a></div>
                </div>
                <a href="#" className="new_center">
                    {selectedProgramContent.img && <img src={selectedProgramContent.img} alt="Selected Program" />}
                    <div className="title1">{selectedProgramContent.title}</div>
                    <div className="date">2024.05.02~2024.05.14</div>
                </a>
                <div className="home_title3">
                    <div>새로운 온라인 교육/체험</div>
                    {['프로그램 제목', '프로그램 제목', '프로그램 제목', '프로그램 제목'].map((title, index) => (
                        <div key={index} className="title2" onClick={() => handleClick(index + 1)}>{title}</div>
                    ))}
                    <div><a href="#">더보기 →</a></div>
                </div>
            </div>

            <div className="online_category">
                <div className="home_title4">온라인 교육</div>
                <div className="icon">
                    {[{src: art, label: '미술'}, {src: science, label: '과학'}, {src: music, label: '음악'}, {src: design, label: '디자인'}, {src: study, label: '교육'}, {src: etc, label: '기타'}].map((icon, index) => (
                        <a key={index} href='#'>
                            <img src={icon.src} alt={icon.label} />
                            <span>{icon.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Body;