import React, { useState, useEffect } from 'react';
import './ManageLecOnDetail.css';

function EducationItem({ id, name, onAddSubItem, onDeleteSubItem, isParent, onAttachFile }) {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", width: "100%", height: "40px", marginTop: "10px" }}>
            {isParent && (
                <>
                    <p style={{ margin: "0 10px 0 0" }}>{name}</p>
                    <input type="text" value={text} onChange={handleTextChange} style={{ marginRight: "10px", width: "370px" }} />
                    <button type="button" onClick={onAddSubItem} style={{ marginRight: "10px", width: "30px", height: "30px", backgroundColor: "#EDEDED" }}>+</button>
                    <button type="button" onClick={onDeleteSubItem} style={{ width: "30px", height: "30px", backgroundColor: "#FF8585" }}>-</button>
                </>
            )}
            {!isParent && (
                <>
                    <p style={{ margin: "0 5px 0 5px", width: "50px" }}>{name}</p>
                    <input type="text" value={text} onChange={handleTextChange} style={{ marginRight: "10px", width: "230px" }} />
                    <input type="file" onChange={onAttachFile} style={{ display: 'none' }} id={`file-input-${id}`} />
                    <label htmlFor={`file-input-${id}`} style={{ marginRight: "10px", width: "70px", height: "30px", backgroundColor: "#EDEDED", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>파일 선택</label>
                    <button type="button" onClick={onDeleteSubItem} style={{ width: "30px", height: "30px", backgroundColor: "#FF8585" }}>-</button>
                </>
            )}
        </div>
    );
}

function ManageLecOnDetail() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [items, setItems] = useState([]);
    const [parentCounter, setParentCounter] = useState(1);
    const [subCounters, setSubCounters] = useState({});

    useEffect(() => {
        handleAddItem();
    }, []);

    const handleAddItem = () => {
        const newItemId = items.length + 1;
        const newItem = {
            id: newItemId,
            name: `${newItemId}강`,
            subItems: [],
        };
        setItems([...items, newItem]);
        setParentCounter(newItemId + 1);
    };

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

    const handleDeleteSubItem = (parentId) => {
        const updatedItems = items.map(item => {
            if (item.id === parentId) {
                const newSubItems = item.subItems.slice(0, -1);
                return {
                    ...item,
                    subItems: newSubItems,
                };
            }
            return item;
        });
        setItems(updatedItems);
        const maxId = Math.max(...updatedItems.find(item => item.id === parentId).subItems.map(subItem => parseInt(subItem.id.split('-')[1])));
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

    const handleDeleteParentItem = (parentId) => {
        const updatedItems = items.filter(item => item.id !== parentId);
        setItems(updatedItems);
        setParentCounter(updatedItems.length + 1);
    };

    const handleAttachFile = (event) => {
        const file = event.target.files[0];
        console.log(`파일 첨부: ${file.name}`);
    };

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(autoHypenPhone(value));
    };

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
            tmp += str.substr(3, 4) + '-';
            tmp += str.substr(7);
            return tmp;
        } else {
            tmp += str.substr(0, 3) + '-';
            tmp += str.substr(3, 4) + '-';
            tmp += str.substr(7);
            return tmp;
        }
    };

    return (
        <div className='lecOnDetail_container_'>
            <div className='lecOnDetail'>
                <h3>강의 상세정보(온라인)</h3>
                <div className='lecOnDetail_area'>
                    <div className='lecOnDetail_center'>
                        <select id='lecOnDetail_lecField'>
                            <option value='art'>미술</option>
                            <option value='science'>과학</option>
                            <option value='music'>음악</option>
                            <option value='design'>디자인</option>
                            <option value='education'>교육</option>
                            <option value='etc'>기타</option>
                        </select>
                        <div>
                            {items.map(item => (
                                <div key={item.id} className="education-item-wrapper">
                                    <button type="button" onClick={() => handleDeleteParentItem(item.id)} style={{ marginTop: "10px", marginRight: "10px", float: "right" }}>-</button>
                                    <button type="button" onClick={handleAddItem} style={{ marginTop: "10px", marginRight: "10px", float: "right" }}>+</button>
                                    
                                    <EducationItem
                                        id={item.id}
                                        name={item.name}
                                        onAddSubItem={() => handleAddSubItem(item.id)}
                                        onDeleteSubItem={() => handleDeleteSubItem(item.id)}
                                        onAttachFile={handleAttachFile}
                                        isParent={true}
                                    />
                                    {item.subItems.map(subItem => (
                                        <EducationItem
                                            key={subItem.id}
                                            id={subItem.id}
                                            name={subItem.name}
                                            onDeleteSubItem={() => handleDeleteSubItem(item.id)}
                                            onAddSubItem={() => handleAddSubItem(item.id)}
                                            onAttachFile={handleAttachFile}
                                            isParent={false}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageLecOnDetail;
