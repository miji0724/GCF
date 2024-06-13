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
    const [isEditing, setIsEditing] = useState(false);
    const [editableMember, setEditableMember] = useState({ ...member, password: '' });

    useEffect(() => {
        if (member && member.email) {
            const { emailId, emailDomain } = splitEmail(member.email);
            setEmailId(emailId);
            setEmailDomain(emailDomain);
        }
    }, [member]);

    useEffect(() => {
        if (member) {
            const updatedMember = {
                ...member,
                birth: formatDate(member.birth),
                interests: member.interests || [],
                mail_agreement: member.mail_agreement ? 'true' : 'false',
                message_agreement: member.message_agreement ? 'true' : 'false',
                email_agreement: member.email_agreement ? 'true' : 'false',
                married: member.married ? 'true' : 'false',
                hasChildren: member.hasChildren ? 'true' : 'false'
            };

            setEditableMember(prevState => ({ ...prevState, ...updatedMember }));
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
        const updatedMember = {
            ...editableMember,
            email: `${emailId}@${emailDomain}`
        };

        if (updatedMember.password === '') {
            delete updatedMember.password;
        }

        console.log(updatedMember);

        axios.put(`http://localhost:8090/manage/modify/${member.id}`, updatedMember)
            .then(response => {
                console.log('Member data updated successfully:', response.data);
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error updating member data:', error);
            });
    };

    const handleDelete = () => {
        console.log('member info :', editableMember);
    };

    const handleInterestChange = (e) => {
        const { id, checked } = e.target;
        const interest = id;

        console.log('체크박스 id:', id);
        console.log('체크 여부:', checked);

        // 관심사 배열의 복사본을 만듭니다.
        let updatedInterests = [...editableMember.interests];

        if (checked) {
            // 체크되었을 경우 관심사를 추가합니다.
            updatedInterests.push(interest);
        } else {
            // 체크 해제되었을 경우 관심사를 제거합니다.
            updatedInterests = updatedInterests.filter(item => item !== interest);
        }

        // 새 관심사 배열로 상태를 업데이트합니다.
        setEditableMember(prevState => ({
            ...prevState,
            interests: updatedInterests
        }));
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        // 입력된 값이 숫자인지 확인합니다.
        const phoneNumber = value.replace(/\D/g, '');
        // 11자리인지 확인합니다.
        if (phoneNumber.length > 11) {
            return;
        }
        // 숫자 11자리인 경우만 상태를 업데이트합니다.
        setEditableMember(prevState => ({
            ...prevState,
            phone_number: phoneNumber
        }));
    };

    const handleRadioChange = (e) => {
        const { id, value } = e.target;
        setEditableMember(prevState => {
            return {
                ...prevState,
                [id]: value
            };
        });
    };

    const formatDate = (dateArray) => {
        if (Array.isArray(dateArray) && dateArray.length === 3) {
            const [year, month, day] = dateArray;
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
        return '';
    };

    return (
        <div className='memDetail_container'>
            <SideMenu />
            <div className='memDetail'>
                <p>일반회원 상세정보</p>
                <a class='back_button' href='javascript:history.back()'>목록으로 돌아가기 &gt;</a>
                <div className='memDetail_area'>
                    <div className='memDetail_left'>
                        <ul>
                            <li>* 이름</li>
                            <li>* 아이디</li>
                            <li>* 생년월일</li>
                            <li>* 휴대폰 번호</li>
                            <li>전화번호</li>
                            <li>* 이메일</li>
                            <li>* 주소</li>
                            <li>상세주소</li>
                            <li>메일수신동의</li>
                            <li>문자수신동의</li>
                            <li>우편수신동의</li>
                            <li>관심사</li>
                            <li>결혼유무</li>
                            <li>자녀유무</li>
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
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    id='id'
                                    value={editableMember.id}
                                    disabled
                                />
                            </li>
                            <li>
                                <input
                                    type='date'
                                    id='birth'
                                    value={editableMember.birth}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    id='phone_number'
                                    value={editableMember.phone_number}
                                    onChange={handlePhoneChange}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    id='tel_number'
                                    value={editableMember.tel_number || ''}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    id='emailId'
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                    disabled={!isEditing}
                                />
                                &nbsp;@&nbsp;
                                <input
                                    type='text'
                                    id='emailDomain'
                                    value={emailDomain}
                                    onChange={(e) => setEmailDomain(e.target.value)}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    id='address'
                                    value={editableMember.address}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    id='detail_address'
                                    value={editableMember.detail_address || ''}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li className='manage_choiceArea'>
                                <input
                                    type='radio'
                                    id='email_agreement'
                                    value='true'
                                    checked={editableMember.email_agreement === 'true'}
                                    onChange={handleRadioChange}
                                    disabled={!isEditing}
                                /> 동의
                                <input
                                    type='radio'
                                    id='email_agreement'
                                    value='false'
                                    checked={editableMember.email_agreement === 'false'}
                                    onChange={handleRadioChange}
                                    disabled={!isEditing}
                                /> 비동의
                            </li>
                            <li className='manage_choiceArea'>
                                <input
                                    type='radio'
                                    id='message_agreement'
                                    value='true'
                                    checked={editableMember.message_agreement === 'true'}
                                    onChange={handleRadioChange}
                                    disabled={!isEditing}
                                /> 동의
                                <input
                                    type='radio'
                                    id='message_agreement'
                                    value='false'
                                    checked={editableMember.message_agreement === 'false'}
                                    onChange={handleRadioChange}
                                    disabled={!isEditing}
                                /> 비동의
                            </li>
                            <li className='manage_choiceArea'>
                                <input
                                    type='radio'
                                    id='mail_agreement'
                                    value='true'
                                    checked={editableMember.mail_agreement === 'true'}
                                    onChange={handleRadioChange}
                                    disabled={!isEditing}
                                /> 동의
                                <input
                                    type='radio'
                                    id='mail_agreement'
                                    value='false'
                                    checked={editableMember.mail_agreement === 'false'}
                                    onChange={handleRadioChange}
                                    disabled={!isEditing}
                                /> 비동의
                            </li>
                            <li className='manage_choiceArea'>
                                <input
                                    type='checkbox'
                                    id='음악'
                                    checked={editableMember.interests.includes('음악')}
                                    onChange={handleInterestChange}
                                    disabled={!isEditing}
                                /> 음악
                                <input
                                    type='checkbox'
                                    id='교육'
                                    checked={editableMember.interests.includes('교육')}
                                    onChange={handleInterestChange}
                                    disabled={!isEditing}
                                /> 교육
                                <input
                                    type='checkbox'
                                    id='미술'
                                    checked={editableMember.interests.includes('미술')}
                                    onChange={handleInterestChange}
                                    disabled={!isEditing}
                                /> 미술
                                <input
                                    type='checkbox'
                                    id='과학'
                                    checked={editableMember.interests.includes('과학')}
                                    onChange={handleInterestChange}
                                    disabled={!isEditing}
                                /> 과학
                                <input
                                    type='checkbox'
                                    id='디자인'
                                    checked={editableMember.interests.includes('디자인')}
                                    onChange={handleInterestChange}
                                    disabled={!isEditing}
                                /> 디자인
                            </li>
                            <li className='manage_choiceArea'>
                                <input
                                    type='radio'
                                    id='married'
                                    value='true'
                                    checked={editableMember.married === 'true'}
                                    onChange={handleRadioChange}
                                    disabled={!isEditing}
                                /> 동의
                                <input
                                    type='radio'
                                    id='married'
                                    value='false'
                                    checked={editableMember.married === 'false'}
                                    onChange={handleRadioChange}
                                    disabled={!isEditing}
                                /> 비동의
                            </li>
                            <li className='manage_choiceArea'>
                                <input
                                    type='radio'
                                    id='hasChildren'
                                    value='true'
                                    checked={editableMember.hasChildren === 'true'}
                                    onChange={handleRadioChange}
                                    disabled={!isEditing}
                                /> 동의
                                <input
                                    type='radio'
                                    id='hasChildren'
                                    value='false'
                                    checked={editableMember.hasChildren === 'false'}
                                    onChange={handleRadioChange}
                                    disabled={!isEditing}
                                /> 비동의
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='memDetail_button_area'>
                    {!isEditing ? (
                        <button id='memDetail_confirmStart' onClick={handleEditToggle}>
                            수정
                        </button>
                    ) : (
                        <>
                            <button id='memDetail_confirm' onClick={handleSave}>
                                완료
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
