import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Carousel from './carousel/Carousel';
import art from '../img/off_home_icon/art_icon.png';
import science from '../img/off_home_icon/science_icon.png';
import music from '../img/off_home_icon/music_icon.png';
import design from '../img/off_home_icon/design_icon.png';
import study from '../img/off_home_icon/study_icon.png';
import etc from '../img/off_home_icon/etc_icon.png';
import './Body.css';

const Body = ({ isLoggedIn }) => {
    const [selectedOfflineProgram, setSelectedOfflineProgram] = useState(null);
    const [selectedOnlineProgram, setSelectedOnlineProgram] = useState(null);
    const [notices, setNotices] = useState([]);
    const [banners1, setBanners1] = useState([]);
    const [banners2, setBanners2] = useState([]);
    const [offProgramsView, setOffProgramsView] = useState([]);
    const [offProgramsNew, setOffProgramsNew] = useState([]);
    const [onProgramsView, setOnProgramsView] = useState([]);
    const [onProgramsNew, setOnProgramsNew] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const navigate = useNavigate();
  
    const gotoOnlineListCategory = (category) => {
        navigate(`/OnlineList/${category}`); // 카테고리별 필터 기능
    };

    const categoryClassMap = {
        '미술': 'art',
        '과학': 'science',
        '음악': 'music',
        '디자인': 'design',
        '교육': 'study',
        '기타': 'etc'
    };

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const noticesResponse = await axios.get('/home/notices');
                const sortedNotices = noticesResponse.data.slice(0, 4);
                setNotices(sortedNotices);

                const banners1Response = await axios.get('/banner/banner1');
                const banners1Data = banners1Response.data.map(banner => ({
                    filePath: banner.filePath,
                    url: banner.url
                }));
                setBanners1(banners1Data);

                const banners2Response = await axios.get('/banner/banner2');
                const banners2Data = banners2Response.data.map(banner => ({
                    filePath: banner.filePath,
                    url: banner.url
                }));
                setBanners2(banners2Data);

                const offProgramsViewResponse = await axios.get('/offProgram/views/top4');
                setOffProgramsView(Array.isArray(offProgramsViewResponse.data) ? offProgramsViewResponse.data : []);

                const offProgramsNewResponse = await axios.get('/offProgram/new/top4');
                setOffProgramsNew(Array.isArray(offProgramsNewResponse.data) ? offProgramsNewResponse.data : []);

                const onProgramsViewResponse = await axios.get('/onProgram/views/top4');
                setOnProgramsView(Array.isArray(onProgramsViewResponse.data) ? onProgramsViewResponse.data : []);

                const onProgramsNewResponse = await axios.get('/onProgram/new/top4');
                setOnProgramsNew(Array.isArray(onProgramsNewResponse.data) ? onProgramsNewResponse.data : []);

                setDataLoaded(true);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (dataLoaded && offProgramsNew.length > 0) {
            setSelectedOfflineProgram(offProgramsNew[0]);
        }
    }, [dataLoaded, offProgramsNew]);

    const handleAuthRedirect = (componentName) => {
        window.location.href = `/MyAuthenticationForm?component=${componentName}`;
    };

    const handleClickNotice = async (id) => {
        try {
            await axios.put(`/notices/${id}/views`);
            navigate(`/notice/${id}`);
        } catch (error) {
            console.error('Failed to increase notice views', error);
        }
    };

    if (!dataLoaded) {
        return null; // 데이터가 로드되지 않았을 때 아무것도 렌더링하지 않음
    }

    return (
        <div className="body">
            <div className="banner01">
                {banners1.length > 0 && <Carousel images={banners1} />}
            </div>

            <ul className="button_notice">
                <li className="button01">
                    <a className="plan_button" href="/schedule">이달의 일정<div>⇀</div></a>
                    {isLoggedIn ? (
                        <a className="teacher_button" onClick={() => handleAuthRedirect('teacher_register')}>강사 등록<div>⇀</div></a>
                    ) : (
                        <a className="teacher_button" onClick={() => alert('로그인이 필요합니다.')}>강사 등록<div>⇀</div></a>
                    )}
                    {isLoggedIn ? (
                        <a className="issue_button" onClick={() => handleAuthRedirect('certification')}>증명서 발급<div>⇀</div></a>
                    ) : (
                        <a className="issue_button" onClick={() => alert('로그인이 필요합니다.')}>증명서 발급<div>⇀</div></a>
                    )}
                </li>
                <li className="notice_space">
                    <div>
                        <span>공지사항</span>
                        <span><a href="/notice">더보기 →</a></span>
                    </div>
                    {notices.map(notice => (
                    <li key={notice.id} id='notice_content' onClick={() => handleClickNotice(notice.id)}>
                        {notice.title}
                    </li>
                    ))}
                </li>
            </ul>

            <div className="popular">
                <div id="home_title1">인기있는 오프라인 교육/체험</div>
                <ul className="popular_poster">
                    {offProgramsView.map((programView, index) => (
                        <li key={index}>
                            <a href={`/offlineList/detail/${programView.programName}`}>
                                <img src={programView.poster.file_path} alt={`Poster ${index + 1}`} />
                                <div
                                    className="off_category"
                                    style={{
                                        backgroundColor: programView.category === '교육' ? '#faf0ff' : '#daffd5'
                                    }}
                                >
                                    {programView.category}
                                </div>
                                <div className="title1">{programView.programName}</div>
                                <div className="date">{new Date(programView.operatingStartDay).toLocaleDateString()} ~ {new Date(programView.operatingEndDay).toLocaleDateString()}</div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="popular">
                <div id="home_title1">인기있는 온라인 교육/체험</div>
                <ul className="popular_poster">
                    {onProgramsView.map((program, index) => (
                        <li key={index}>
                            <a href={`/onlineList/detail/${program.programName}`}>
                                <img src={program.poster.file_path} alt={`Poster ${index + 1}`} />
                                <div className={`on_category ${categoryClassMap[program.category]}`}>
                                    {program.category}
                                </div>
                                <div className="title1">{program.programName}</div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="banner02">
                {banners2.length > 0 && <Carousel images={banners2} />}
            </div>

            <div className="new">
                <div className="home_title2">
                    <div>새로운 오프라인 교육/체험</div>
                    {offProgramsNew.map((OffprogramNew, index) => (
                        <div key={index} className="title2" onClick={() => {
                            setSelectedOfflineProgram(OffprogramNew);
                            setSelectedOnlineProgram(null); // Add this line to nullify the selected online program
                        }}>{OffprogramNew.programName}</div>
                    ))}
                    <div><a href="#">더보기 →</a></div>
                </div>

                {selectedOfflineProgram && (
                    <a className="new_center" href={`/offlineList/detail/${selectedOfflineProgram.programName}`}>
                        {selectedOfflineProgram.poster && <img src={selectedOfflineProgram.poster.file_path} alt="Selected Program" />}
                        <div className="title1">{selectedOfflineProgram.programName}</div>
                        <div className="date">{new Date(selectedOfflineProgram.operatingStartDay).toLocaleDateString()} ~ {new Date(selectedOfflineProgram.operatingEndDay).toLocaleDateString()}</div>
                    </a>
                )}

                {selectedOnlineProgram && (
                    <a className="new_center" href={`/onlineList/detail/${selectedOnlineProgram.programName}`}>
                        {selectedOnlineProgram.poster && <img src={selectedOnlineProgram.poster.file_path} alt="Selected Program" />}
                        <div className="title1">{selectedOnlineProgram.programName}</div>
                    </a>
                )}

                <div className="home_title3">
                        <div>새로운 온라인 교육/체험</div>
                        {onProgramsNew.map((OnprogramNew, index) => (
                            <div key={index} className="title2" onClick={() => {
                                setSelectedOnlineProgram(OnprogramNew);
                                setSelectedOfflineProgram(null); // Add this line to nullify the selected offline program
                            }}>{OnprogramNew.programName}</div>
                        ))}
                </div>
            </div>

            <div className="online_category">
                <div className="home_title4">온라인 교육</div>
                <div className="icon">
                    {[{src: art, label: '미술'}, {src: science, label: '과학'}, {src: music, label: '음악'}, {src: design, label: '디자인'}, {src: study, label: '교육'}, {src: etc, label: '기타'}].map((icon, index) => (
                        <a key={index} onClick={() => gotoOnlineListCategory(icon.label)}>
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
