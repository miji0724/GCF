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
                    <p>{name}</p>
                    <p style={{ marginRight: "10px" }}>강</p>
                    <input type="text" value={text} onChange={(e) => onTextChange(id, e.target.value)} style={{ marginRight: "10px", width: "370px" }} />
                    <button onClick={onAddSubItem} style={{
                        marginRight: "10px"
                        , width: "30px"
                        , height: "30px"
                        , backgroundColor: "#EDEDED"
                    }}>+</button>{/* 하위 추가 */}
                    <button onClick={onDeleteSubItem} style={{
                        width: "30px"
                        , height: "30px"
                        , marginRight: "10px"
                        , backgroundColor: "#FF8585"
                    }}>-</button>{/* 하위 제거 */}
                </>
            )}
            {!isParent && (
                <>
                    {/* 하위 항목 */}
                    <p style={{ marginLeft: "5px", marginRight: "5px", width: "50px" }}>{name}</p>
                    <input type="text" value={text} onChange={(e) => onTextChange(id, e.target.value)} style={{ marginRight: "10px", width: "300px" }} />
                    <input type="file" onChange={(e) => onFileChange(id, e.target.files[0])} style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} />
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
        const newSubItemId = (subCounters[parentId] || 0) + 1; // 현재 하위 항목의 카운터
        const newSubItem = {
            id: `${parentId}-${newSubItemId}`, // 부모 항목 ID와 하위 항목 일련번호를 조합하여 생성
            name: `${parentId}-${newSubItemId}`,
            text: '',
            file: null,
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
                    <a class='back_button' href='javascript:history.back()'>목록으로 돌아가기 &gt;</a>
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
                                <li> <input type='text' id='lecOnAppDetail_lecTitle' value={item.programName} /></li>
                                <li> <input type='text' id='lecOnAppDetail_name' value={item.teacher.member.name} /></li>
                                <li> <input type="text" id='lecOnAppDetail_phoneNum' maxLength="13" value={item.teacher.member.phone_number} /></li>
                                <li> <input type="text" id='lecOnAppDetail_landNum' maxLength="11" value={item.teacher.member.tel_number} /> </li>
                                
                                <li><input type='file' id='lecOnAppDetail_poster_attachment' /></li>

                                <div className='introduceEdu_buttonAlign'>
                                    <div className='introduceEdu_area'>
                                        {eduInputs.map(input => (
                                            <div key={input.id} className='introduceEdu_flexArea'>
                                                <li>
                                                    <input type='text' id={`lecOnAppDetail_introduceEdu_detail_${input.id}`} />
                                                    <button onClick={() => handleRemoveEduInput(input.id)} style={{
                                                        width: "30px"
                                                        , height: "30px"
                                                        , backgroundColor: "#FF8585"
                                                        , margin: "0 10px"
                                                    }}>-</button>
                                                </li>
                                                <li>
                                                    <input type='file' className='introduceEdu_attachment' id={`lecOnAppDetail_introduceEdu_attachment_${input.id}`} />
                                                </li>
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
                                        {teachInputs.map(input => (
                                            <div key={input.id} className='introduceTeach_flexArea'>
                                                <li>
                                                    <input type='text' id={`lecOnAppDetail_introduceTeach_detail_${input.id}`} />
                                                    <button onClick={() => handleRemoveTeachInput(input.id)} style={{
                                                        width: "30px"
                                                        , height: "30px"
                                                        , backgroundColor: "#FF8585"
                                                        , margin: "0 10px"
                                                    }}>-</button>
                                                </li>
                                                <li>
                                                    <input type='file' className='introduceTeach_attachment' id={`lecOnAppDetail_introduceTeach_attachment_${input.id}`} />
                                                </li>
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

                                <li>
                                    <select id='lecOnAppDetail_lecField'>{/*문학 미술 음악 무용 영상 연극 영화 국악 건축 출판 만화*/}

                                        <option value='art'>미술</option>
                                        <option value='science'>과학</option>
                                        <option value='music'>음악</option>
                                        <option value='design'>디자인</option>
                                        <option value='education'>교육</option>
                                        <option value='etc'>기타</option>
                                    </select>
                                </li>
                                <li>
                                    <div className='trainList'>
                                        <div className='trainList_area'>
                                            {items.map(item => (
                                                <div className='trainList_left' >
                                                    <div key={item.id} className="education-item-wrapper">
                                                        <EducationItem
                                                            id={item.id}
                                                            name={item.name}
                                                            onDelete={() => handleDeleteItem(item.id)}
                                                            onAddSubItem={() => handleAddSubItem(item.id)}
                                                            onDeleteSubItem={() => handleDeleteSubItem(item.id)}
                                                            isParent={true}
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
                                            }}>+</button>

                                            <button onClick={handleDeleteItem} style={{
                                                float: "right"
                                                , width: "30px"
                                                , height: "30px"
                                                , backgroundColor: "#FF8585"
                                                , display: "flex"
                                                , alignItems: "center"
                                                , justifyContent: "center"
                                            }}>-</button>
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