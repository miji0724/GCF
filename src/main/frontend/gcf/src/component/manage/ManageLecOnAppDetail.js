import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import SideMenu from './ManageSideMenu';
import './ManageLecOnAppDetail.css';

function EducationItem({ id, name, onDelete, onAddSubItem, onDeleteSubItem, isParent, text, onTextChange, file, onFileChange }) {
    
    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", width: "500px", height: "40px", marginTop: "10px" }}>
            {isParent && (
                <>
                    {/* 상위 항목 */}
                    <p style={{ marginRight: "10px" }}>{name}</p>
                    <input type="text" value={text} onChange={(e) => onTextChange(id, e.target.value)} style={{ marginRight: "10px", width: "370px" }} />
                    <button onClick={onAddSubItem} style={{
                        marginRight: "10px",
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#EDEDED"
                    }} readOnly>+</button>{/* 하위 추가 */}
                    <button onClick={onDeleteSubItem} style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                        backgroundColor: "#FF8585"
                    }} readOnly>-</button>{/* 하위 제거 */}
                </>
            )}
            {!isParent && (
                <>
                    {/* 하위 항목 */}
                    <p style={{ marginLeft: "5px", marginRight: "5px", width: "50px" }}>{name}</p>
                    <input type="text" value={text} onChange={(e) => onTextChange(id, e.target.value)} style={{ marginRight: "10px", width: "300px" }} />
                    <input type="text"value={text} onChange={(e) => onTextChange(id, e.target.value)} style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} />
                </>
            )}
        </div>
    );
}

function ManageLecOnAppDetail() {
    const location = useLocation();
    const item = location.state.item;

    const [items, setItems] = useState([]);
    const [parentCounter, setParentCounter] = useState(1);
    const [subCounters, setSubCounters] = useState({}); // 각 상위 항목의 하위 항목 카운터를 저장하는 객체

    const [emailId, setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('');

    const [onLecInfo, setOnLecInfo] = useState({
        programName: '',
        teacher: {
            member: {
                name: '',
                phone_number: '',
                tel_number: '',
            }
        },
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
        approvalState: '',
        programInfos: [],
        teacherInfos: [],
        comments: [],
        videos: [],
    });

    useEffect(() => {
        if (item) {
            setOnLecInfo(item);
            setItems(item.videos.map((video, index) => ({
                id: video.videoInfoIndex,
                name: video.videoInfoIndex,
                subItems: video.subItems && video.subItems.length > 0 ? video.subItems.map((subItem, subIndex) => ({
                    id: subItem.videoInfoIndex,
                    name: subItem.videoInfoIndex,
                    text: subItem.videoInfoDetail,
                    file: subItem.attachment.original_name,
                })) : [],
                text: video.videoInfoDetail,
                file: null,
            })));
    
            // Initialize parentCounter and subCounters
            let parentCounter = item.videos.length + 1;
            let subCounters = {};
    
            item.videos.forEach((video, index) => {
                // Check if video has subItems
                if (video.subItems && video.subItems.length > 0) {
                    // Count subItems within each video
                    let subItemCounter = video.attachment ? 1 : 0;
                    video.subItems.forEach(subItem => {
                        if (subItem.attachment) {
                            subItemCounter++;
                        }
                    });
    
                    // Set subCounter for each parent item
                    subCounters[index + 1] = subItemCounter;
                }
            });
    
            setParentCounter(parentCounter);
            setSubCounters(subCounters);
        }
    }, [item]);
    
    const handleAddItem = useCallback(() => {
        setItems(prevItems => {
            const newItemId = parentCounter;
            const newItem = {
                id: newItemId,
                name: `${newItemId}`,
                subItems: [],
                text: '',
                file: null,
            };
            return [...prevItems, newItem];
        });
        setParentCounter(prevCounter => prevCounter + 1);
    }, [parentCounter]);

    const handleAddSubItem = (parentId) => {
        const parentItem = items.find(item => item.id === parentId);
    
        if (parentItem) {
            const newSubItemId = (subCounters[parentId] || 0) + 1; // 현재 하위 항목의 카운터
            const newSubItem = {
                id: `${parentId}-${newSubItemId}`, // 부모 항목 ID와 하위 항목 일련번호를 조합하여 생성
                name: `${parentId}-${newSubItemId}`,
                text: '',
                file: null, // 파일을 null로 설정하여 새로운 하위 항목에는 파일이 없음을 지정
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
        }
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
        if (subCounters[parentId] < 1) { // parentId의 하위 항목 개수가 1보다 작을 때
            setSubCounters({
                ...subCounters,
                [parentId]: 0,
            });
        }
    };

    // State for managing 'introduceEdu' input sets
    const [eduInputs, setEduInputs] = useState([{ id: 1 }]);

    // State for managing 'introduceTeach' input sets
    const [teachInputs, setTeachInputs] = useState([{ id: 1 }]);

    // Function to add a new 'introduceEdu' input set
    const handleAddEduInput = () => {
        setEduInputs([...eduInputs, { id: eduInputs.length + 1 }]);
    };

    // Function to remove an 'introduceEdu' input set
    const handleRemoveEduInput = (id) => {
        setEduInputs(eduInputs.filter(input => input.id !== id));
    };

    // Function to add a new 'introduceTeach' input set
    const handleAddTeachInput = () => {
        setTeachInputs([...teachInputs, { id: teachInputs.length + 1 }]);
    };

    // Function to remove an 'introduceTeach' input set
    const handleRemoveTeachInput = (id) => {
        setTeachInputs(teachInputs.filter(input => input.id !== id));
    };

    return (
        <body>
            <div className='lecOnAppDetail_container'>
                <SideMenu />
                <div className='lecOnAppDetail'>
                    <p>강의 검토 페이지(온라인)</p>
                    <a className='back_button' href='javascript:history.back()'>목록으로 돌아가기 &gt;</a>
                    <div className='lecOnAppDetail_area'>
                        <div className='lecOnAppDetail_left'>
                            <ul>
                                <li>* 강의 제목</li>
                                <li>* 강사 이름</li>
                                <li>* 휴대폰 번호</li>
                                <li>전화번호</li>
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
                                <li> <input type='text' id='lecOnAppDetail_lecTitle' value={item.programName} readOnly /></li>
                                <li> <input type='text' id='lecOnAppDetail_lecTeacher' value={item.teacher.member.name} readOnly /></li>
                                <li> <input type='text' id='lecOnAppDetail_lecPhoneNum' value={item.teacher.member.phone_number} readOnly /></li>
                                <li> <input type='text' id='lecOnAppDetail_lecTelNum' value={item.teacher.member.tel_number} readOnly /></li>
                                <li> <input type='text' id='lecOnAppDetail_lecBannerPoster' value={item.poster.file_name} readOnly /></li>

                                <div className='introduceEdu_buttonAlign'>
                                    <div className='introduceEdu_area'>
                                        {eduInputs.map((input, index) => (
                                            <div key={input.id} className='introduceEdu_flexArea'>
                                                <li> <input type='text' id='lecOnAppDetail_lecIntroduce' defaultValue={item.programInfos[index]?.description} /></li>
                                                {eduInputs.length > 1 && (
                                                    <button onClick={() => handleRemoveEduInput(input.id)}>-</button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddEduInput} style={{
                                        float: "right"
                                        , width: "30px"
                                        , height: "30px"
                                        , marginLeft: "10px"
                                        , backgroundColor: "#EDEDED"
                                    }}>+</button>
                                </div>
                                <div className='introduceTeach_buttonAlign'>
                                    <div className='introduceTeach_area'>
                                        {teachInputs.map((input, index) => (
                                            <div key={input.id} className='introduceTeach_flexArea'>
                                                <li> <input type='text' id='lecOnAppDetail_lecIntroduce' defaultValue={item.teacherInfos[index]?.description} /></li>
                                                {teachInputs.length > 1 && (
                                                    <button onClick={() => handleRemoveTeachInput(input.id)}>-</button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddTeachInput} style={{
                                        float: "right"
                                        , width: "30px"
                                        , height: "30px"
                                        , marginLeft: "10px"
                                        , backgroundColor: "#EDEDED"
                                    }}>+</button>
                                </div>
                                <li> <input type='text' id='lecOnAppDetail_lecCategory' value={item.category} readOnly /></li>
                                <li>
                                    <div className='trainList'>
                                        <div className='trainList_area'>
                                            {items.map((item, index) => (
                                                <div className='trainList_left' >
                                                    <div key={item.id} className="education-item-wrapper">
                                                        <EducationItem
                                                            key={item.id}
                                                            id={item.id}
                                                            name={item.name}
                                                            onDelete={() => handleDeleteItem(item.id)}
                                                            onAddSubItem={() => handleAddSubItem(item.id)}
                                                            onDeleteSubItem={() => handleDeleteSubItem(item.id)}
                                                            isParent={true}
                                                            text={item.text}
                                                            onTextChange={(id, value) => {
                                                                setItems(prevItems =>
                                                                    prevItems.map(item =>
                                                                        item.id === id ? { ...item, text: value } : item
                                                                    )
                                                                );
                                                            }}
                                                            file={item.file}
                                                            onFileChange={(id, file) => {
                                                                setItems(prevItems =>
                                                                    prevItems.map(item =>
                                                                        item.id === id ? { ...item, file: file } : item
                                                                    )
                                                                );
                                                            }}
                                                        />
                                                        {item.subItems.map(subItem => (
                                                            <div key={subItem.id} className="sub-education-item-wrapper">
                                                                <EducationItem
                                                                    id={subItem.id}
                                                                    name={subItem.name}
                                                                    onDeleteSubItem={() => handleDeleteSubItem(item.id)}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='trainList_right'>
                                            <button onClick={handleAddItem} style={{
                                                float: "right"
                                                , width: "30px"
                                                , height: "30px"
                                                , marginRight: "10px"
                                                , backgroundColor: "#EDEDED"
                                                , display: "flex"
                                                , alignItems: "center"
                                                , justifyContent: "center"
                                            }} readOnly>+</button>

                                            <button onClick={handleDeleteItem} style={{
                                                float: "right"
                                                , width: "30px"
                                                , height: "30px"
                                                , backgroundColor: "#FF8585"
                                                , display: "flex"
                                                , alignItems: "center"
                                                , justifyContent: "center"

                                            }} readOnly>-</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='lecOnAppDetail_button_area'>
                        <button id='lecOnAppDetail_approval'>승인</button>
                        <button id='lecOnAppDetail_notApproval'>미승인</button>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default ManageLecOnAppDetail;
