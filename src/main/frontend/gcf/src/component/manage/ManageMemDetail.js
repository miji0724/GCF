import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SideMenu from './ManageSideMenu';
import './ManageMemDetail.css';
import axios from 'axios';

function ManageMemDetail() {
    const location = useLocation();
    const { member } = location.state || {};

    const [emailId, setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [isEditing, setIsEditing] = useState(false); // isEditing 상태 추가
    const [editableMember, setEditableMember] = useState({ ...member, password: '' });

    useEffect(() => {
        if (member && member.email) {
            const { emailId, emailDomain } = splitEmail(member.email);
            setEmailId(emailId);
            setEmailDomain(emailDomain);
        }
    }, [member]);

    useEffect(() => {
        if (member && member.birth) {
            console.log('Raw birth date:', member.birth);
    
            // JavaScript Date 객체로 변환
            const birthDate = new Date(member.birth[0], member.birth[1] - 1, member.birth[2]);
    
            // 원하는 형식으로 포맷팅 (YYYY-MM-DD)
            const formattedDate = `${birthDate.getFullYear()}-${(birthDate.getMonth() + 1).toString().padStart(2, '0')}-${birthDate.getDate().toString().padStart(2, '0')}`;
    
            console.log('Formatted birth date:', formattedDate);
    
            setEditableMember(prevState => ({ ...prevState, birth: formattedDate }));
        }
    }, [member]);
    
    
    

    if (!member) {
        return <div>멤버 정보가 없습니다.</div>;
    }

    const splitEmail = (email) => {
        const [emailId, emailDomain] = email.split('@');
        return { emailId, emailDomain };
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEditableMember({ ...editableMember, [id]: value });
    };

    const handleSave = () => {
        // save logic here, you might want to send updated data to the server
        const updatedMember = { ...editableMember };
        
        if (updatedMember.password === '') {
            delete updatedMember.password;
        }

        axios.put('http://localhost:8090/manage/modify/${member.id}', updatedMember)
        .then(response => {
            // Handle success
            console.log('Member data updated successfully:', response.data);
            setIsEditing(false); // Exit editing mode
        })
        .catch(error => {
            // Handle error
            console.error('Error updating member data:', error);
            // You can show a toast or display an error message to the user
        });
};

    const handleDelete = () => {
        // delete logic here
        console.log('member info :', editableMember);
    };

    return (
        <div className='memDetail_container'>
            <SideMenu />
            <div className='memDetail'>
                <p>일반회원 상세정보</p>
                <div className='memDetail_area'>
                    <div className='memDetail_left'>
                        <ul>
                            <li>* 이름</li>
                            <li>* 아이디</li>
                            <li>* 비밀번호</li>
                            <li>* 생년월일</li>
                            <li>* 휴대폰 번호</li>
                            <li>전화번호</li>
                            <li>* 이메일</li>
                            <li>* 주소</li>
                            <li>상세주소</li>
                        </ul>
                    </div>
                    <div className='memDetail_right'>
                        <ul>
                            <li>
                                <input
                                    type='text'
                                    id='name'
                                    value={editableMember.name}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    id='id'
                                    value={editableMember.id}
                                    readOnly // id 필드는 항상 readOnly로 설정
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    id='password'
                                    value={editableMember.password}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='date'
                                    id='birth'
                                    value={editableMember.birth}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    id='phone_number'
                                    value={editableMember.phone_number}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    id='landline'
                                    value={editableMember.landline || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    id='emailId'
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                    readOnly={!isEditing}
                                />
                                &nbsp;@&nbsp;
                                <input
                                    type='text'
                                    id='emailDomain'
                                    value={emailDomain}
                                    onChange={(e) => setEmailDomain(e.target.value)}
                                    readOnly={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    id='address'
                                    value={editableMember.address}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    id='detail_address'
                                    value={editableMember.detail_address || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='memDetail_button_area'>
                    {!isEditing ? (
                        <button id='memDetail_confirmStart' onClick={handleEditToggle}>
                            수정하기
                        </button>
                    ) : (
                        <>
                            <button id='memDetail_confirm' onClick={handleSave}>
                                수정
                            </button>
                            <button id='memDetail_delete' onClick={handleDelete}>
                                삭제
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageMemDetail;
