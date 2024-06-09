import React, { useState, useEffect, useCallback } from 'react';
import SideMenu from './ManageSideMenu';
import './ManageLecOnDetail.css';

function EducationItem({ id, name, onDelete, onAddSubItem, onDeleteSubItem, isParent }) {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [lecInfo, setLecInfo] = useState({
        onProgramName: '',
        operatingStartDay: '',
        views: 0,
        likesCount: 0,
        onlineCategory: '',
        programType: '',
        poster: {
            original_name:'',
            file_name:'',
            file_path:'',
            parent:'',
        },
        programInfos: [],
        teacherInfos: [],
        comments: [],
        videos: [],
        teacher: {
            member:{
                name:'',
                phone_number:'',
                tel_number:'',
                email:'',
            }
        }
    });
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", width: "500px", height: "40px", marginTop: "10px" }}>
            {isParent && (
                <>
                    {/* 상위 항목 */}
                    <p>{name}</p>
                    <p style={{ marginRight: "10px" }}>강</p>
                    <input type="text" value={text} onChange={handleTextChange} style={{ marginRight: "10px", width: "370px" }} />
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
                    <input type="text" value={text} onChange={handleTextChange} style={{ marginRight: "10px", width: "300px" }} />
                    <input type="file" onChange={handleFileChange} style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} />
                </>
            )}
        </div>
    );
}

function ManageLecOnDetail() {

    const [phoneNumber, setPhoneNumber] = useState('');

    const autoHypenPhone = (str) => {
        str = str.replace(/[^0-9]/g, '');
        let tmp = '';
        if (str.length < 4) {
            return str;
        } else if (str.length < 7) {
            tmp += str.substr(0, 3) + '-';
            tmp += str.substr(3);
            return tmp;
        } else if (str.length < 11) {
            tmp += str.substr(0, 3) + '-';
            tmp += str.substr(3, 3) + '-';
            tmp += str.substr(6);
            return tmp;
        } else {
            tmp += str.substr(0, 3) + '-';
            tmp += str.substr(3, 4) + '-';
            tmp += str.substr(7);
            return tmp;
        }
    };

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(autoHypenPhone(value));
    };

    const [items, setItems] = useState([]);
    const [parentCounter, setParentCounter] = useState(1);
    const [subCounters, setSubCounters] = useState({}); // 각 상위 항목의 하위 항목 카운터를 저장하는 객체

    useEffect(() => {
        // 초기 상위 항목 추가
        handleAddItem();
    }, []);

    const handleAddItem = useCallback(() => {
        setItems(prevItems => {
            const newItemId = parentCounter;
            const newItem = {
                id: newItemId,
                name: `${newItemId}`,
                subItems: [],
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
            <div className='lecOnDetail_container'>
                <SideMenu />
                <div className='lecOnDetail'>
                    <p>강의 상세정보(온라인)</p>
                    <a class='back_button' href='javascript:history.back()'>목록으로 돌아가기 &gt;</a>
                    <div className='lecOnDetail_area'>
                        <div className='lecOnDetail_left'>
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
                        <div className='lecOnDetail_right'>
                            <ul>
                                <li> <input type='text' id='lecOnDetail_lecTitle'/></li>
                                <li> <input type='text' id='lecOnDetail_name' /></li>
                                <li> <input type="text" id='lecOnDetail_phoneNum' maxLength="13" value={phoneNumber} onChange={handlePhoneNumberChange} /></li>
                                <li> <input type="text" id='lecOnDetail_landNum' maxLength="11" /> </li>
                                <li>
                                    <input type='text' id='lecOnDetail_emailId' />
                                    &nbsp;@&nbsp;
                                    <input type='text' id='lecOnDetail_emailAddr' />
                                </li>
                                <li><input type='file' id='lecOnDetail_poster_attachment' /></li>

                                <div className='introduceEdu_buttonAlign'>
                                    <div className='introduceEdu_area'>
                                        {eduInputs.map(input => (
                                            <div key={input.id} className='introduceEdu_flexArea'>
                                                <li>
                                                    <input type='text' id={`lecOnDetail_introduceEdu_detail_${input.id}`} />
                                                    <button onClick={() => handleRemoveEduInput(input.id)} style={{
                                                        width: "30px"
                                                        , height: "30px"
                                                        , backgroundColor: "#FF8585"
                                                        , margin: "0 10px"
                                                    }}>-</button>
                                                </li>
                                                <li>
                                                    <input type='file' className='introduceEdu_attachment' id={`lecOnDetail_introduceEdu_attachment_${input.id}`} />
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
                                                    <input type='text' id={`lecOnDetail_introduceTeach_detail_${input.id}`} />
                                                    <button onClick={() => handleRemoveTeachInput(input.id)} style={{
                                                        width: "30px"
                                                        , height: "30px"
                                                        , backgroundColor: "#FF8585"
                                                        , margin: "0 10px"
                                                    }}>-</button>
                                                </li>
                                                <li>
                                                    <input type='file' className='introduceTeach_attachment' id={`lecOnDetail_introduceTeach_attachment_${input.id}`} />
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
                                    <select id='lecOnDetail_lecField'>{/*문학 미술 음악 무용 영상 연극 영화 국악 건축 출판 만화*/}

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
                    <div className='lecOnDetail_button_area'>
                        <button id='lecOnDetail_confirm'>수정</button>
                        <button id='lecOnDetail_delete'>삭제</button>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default ManageLecOnDetail;