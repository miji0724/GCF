import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SideMenu from './ManageSideMenu';
import './ManageLecOnAppDetail.css';
import axios from 'axios'

function EducationItem({ name, text, file }) {

    const isParent = !name.includes('-');

    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", width: "500px", height: "40px", marginTop: "10px" }}>
            {isParent && (
                <>
                    <p style={{ marginRight: "10px" }}>{name}</p>
                    <input type="text" value={text} style={{ marginRight: "10px", width: "370px" }} readOnly />
                </>
            )}
            {!isParent && (
                <>
                    <p style={{ marginLeft: "5px", marginRight: "5px", width: "50px" }} >{name}</p>
                    <input type="text" value={text} style={{ marginRight: "10px", width: "300px" }} readOnly />
                    <input type="text" value={file} style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} readOnly />
                </>
            )}
        </div>
    );
}

function ManageLecOnAppDetail() {
    const [items, setItems] = useState([]);
    const [parentCounter, setParentCounter] = useState(1);
    const [subCounters, setSubCounters] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { item } = state || {};

    const [onLecInfo, setOnLecInfo] = useState({
        id: '',
        programName: '',
        operatingStartDay: '',
        views: 0,
        likesCount: 0,
        category: '',
        programType: '',
        poster: {
            original_name: '',
            file_name: '',
            file_path: '',
            parent: '',
        },
        programInfos: [],
        teacherInfos: [],
        comments: [],
        videos: [],
        teacher: {
            member: {
                name: '',
                phone_number: '',
                tel_number: '',
                email: '',
            }
        }
    });

    useEffect(() => {
        if (item) {
            setOnLecInfo(item);
            console.log(item);
        }
    }, [item]);

    const handleAddSubItem = (parentId) => {
        const newSubItemId = (subCounters[parentId] || 0) + 1;
        const newSubItem = {
            id: `${parentId}-${newSubItemId}`,
            name: `${parentId}-${newSubItemId}`,
        };
        const updatedItems = items.map(item => {
            if (item.id === parentId) {
                return {
                    ...item,
                    subItems: [...item.subItems, newSubItem],
                };
            }
            return item;
        });
        setItems(updatedItems);
        setSubCounters({
            ...subCounters,
            [parentId]: newSubItemId,
        });
    };

    const handleDeleteItem = () => {
        const maxId = Math.max(...items.map(item => item.id));
        const updatedItems = items.filter(item => item.id !== maxId);
        setItems(updatedItems);
        setParentCounter(parentCounter - 1);
        if (parentCounter < 1) {
            setParentCounter(0);
        }
    };

    const handleDeleteSubItem = (parentId) => {
        const maxId = Math.max(...items.find(item => item.id === parentId).subItems.map(subItem => parseInt(subItem.id.split('-')[1])));
        const updatedItems = items.map(item => {
            if (item.id === parentId) {
                const newSubItems = item.subItems.filter(subItem => parseInt(subItem.id.split('-')[1]) !== maxId);
                return {
                    ...item,
                    subItems: newSubItems,
                };
            }
            return item;
        });
        setItems(updatedItems);
        setSubCounters({
            ...subCounters,
            [parentId]: maxId - 1,
        });
        if (subCounters[parentId] < 1) {
            setSubCounters({
                ...subCounters,
                [parentId]: 0,
            });
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        const field = id.split('_')[1];

        setOnLecInfo(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    // 승인
    const sendApprovalRequest = () => {
        axios.put(`/manage/onProgramApproval`, onLecInfo.id, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                alert('강의 신청을 승인하였습니다.');
                navigate(-1);
            })
            .catch(error => {
                console.error('There was a problem with your axios operation:', error);
                // 오류 처리 로직을 추가할 수 있습니다.
            });
    };

    // 미승인
    const sendNotApprovalRequest = () => {
        axios.put(`/manage/onProgramNotApproval`, onLecInfo.id, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                alert('강의 신청을 미승인하였습니다.');
                navigate(-1);
            })
            .catch(error => {
                console.error('There was a problem with your axios operation:', error);
                // 오류 처리 로직을 추가할 수 있습니다.
            });
    };

    return (
        <body>
            <div className='lecOnAppDetail_container'>
                <SideMenu />
                <div className='lecOnAppDetail'>
                    <p>강의 상세정보(온라인)</p>
                    <a className='back_button' href='javascript:history.back()'>목록으로 돌아가기 &gt;</a>
                    <div className='lecOnAppDetail_area'>
                        <div className='lecOnAppDetail_left'>
                            <ul>
                                <li>* 강의 제목</li>
                                <li>* 강사 이름</li>
                                <li>* 휴대폰 번호</li>
                                <li>전화번호</li>
                                <li>* 강사 이메일</li>
                                <li>* 교육 배너 포스터</li>
                                <li>* 교육 소개</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>강사소개</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>* 강의분야</li>
                                <li>* 교육목록</li>
                            </ul>
                        </div>
                        <div className='lecOnAppDetail_right'>
                            <ul>
                                <li> <input type='text' id='lecOnAppDetail_onProgramName' value={onLecInfo.programName} onChange={handleChange} readOnly /></li>
                                <li> <input type='text' id='lecOnAppDetail_teacher_name' value={onLecInfo.teacher.member.name} onChange={handleChange} readOnly /></li>
                                <li> <input type="text" id='lecOnAppDetail_teacher_phone_number' maxLength="13" value={onLecInfo.teacher.member.phone_number} onChange={handleChange} readOnly /></li>
                                <li> <input type="text" id='lecOnAppDetail_teacher_tel_number' maxLength="11" value={onLecInfo.teacher.member.tel_number} onChange={handleChange} readOnly /> </li>
                                <li>
                                    <input type='text' id='lecOnAppDetail_teacher_emailId' value={onLecInfo.teacher.member.email.split('@')[0]} onChange={handleChange} readOnly />
                                    &nbsp;@&nbsp;
                                    <input type='text' id='lecOnAppDetail_teacher_emailAddr' value={onLecInfo.teacher.member.email.split('@')[1]} onChange={handleChange} readOnly />
                                </li>
                                <li><input type='text' id='lecOnAppDetail_poster_attachment' value={onLecInfo.poster.original_name} readOnly /></li>

                                <div className='introduceEdu_buttonAlign'>
                                    <div className='introduceEdu_area'>
                                        {onLecInfo.programInfos.map((programInfo, index) => (
                                            <div key={index} className='introduceEdu_flexArea'>
                                                <li>
                                                    <input
                                                        type='text'
                                                        id={`lecOnAppDetail_introduceEdu_detail_${index}`}
                                                        value={programInfo.description}
                                                        readOnly
                                                    />
                                                </li>
                                                <li>
                                                    <input
                                                        type='text'
                                                        value={programInfo.attachment.original_name}
                                                        id={`lecOnAppDetail_introduceEdu_attachment_${index}`}
                                                        readOnly
                                                    />
                                                </li>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className='introduceTeach_buttonAlign'>
                                    <div className='introduceTeach_area'>
                                        {onLecInfo.teacherInfos.map((teacherInfo, index) => (
                                            <div key={index} className='introduceTeach_flexArea'>
                                                <li>
                                                    <input
                                                        type='text'
                                                        id={`lecOnAppDetail_introduceTeach_detail_${index}`}
                                                        value={teacherInfo.description}
                                                        readOnly
                                                    />
                                                </li>
                                                <li>
                                                    <input
                                                        type='text'
                                                        value={teacherInfo.attachment.original_name}
                                                        id={`lecOnAppDetail_introduceTeach_attachment_${index}`}
                                                        readOnly
                                                    />
                                                </li>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <li>
                                    <select id='lecOnAppDetail_lecField' value={onLecInfo.category} disabled>
                                        <option value='미술'>미술</option>
                                        <option value='과학'>과학</option>
                                        <option value='음악'>음악</option>
                                        <option value='디자인'>디자인</option>
                                        <option value='교육'>교육</option>
                                        <option value='기타'>기타</option>
                                    </select>
                                </li>
                                <li>
                                    <div className='trainList'>
                                        <div className='trainList_area'>
                                            {onLecInfo.videos.map(video => (
                                                <div className='trainList_left' key={video.id}>
                                                    <div className="education-item-wrapper">
                                                        <EducationItem
                                                            name={video.videoInfoIndex}
                                                            text={video.videoInfoDetail}
                                                            file={video.attachment ? video.attachment.original_name || '' : ''}
                                                            onDelete={() => handleDeleteItem(video.id)}
                                                            onAddSubItem={() => handleAddSubItem(video.id)}
                                                            onDeleteSubItem={() => handleDeleteSubItem(video.id)}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='lecOnAppDetail_button_area'>
                        <button id='lecOnAppDetail_approval' onClick={sendApprovalRequest}>승인</button>
                        <button id='lecOnAppDetail_notApproval' onClick={sendNotApprovalRequest}>미승인</button>
                    </div>
                    {onLecInfo.teacherInfos.map((teacherInfo, index) => (
                        <div key={index} className='introduceTeach_imgArea'>
                            <img src={teacherInfo.attachment.file_path} />
                        </div>
                    ))}
                    {onLecInfo.programInfos.map((programInfo, index) => (
                        <div key={index} className='introduceTeach_imgArea'>
                            <img src={programInfo.attachment.file_path} />
                        </div>
                    ))}
                </div>
            </div>
        </body>
    );
}

export default ManageLecOnAppDetail;

