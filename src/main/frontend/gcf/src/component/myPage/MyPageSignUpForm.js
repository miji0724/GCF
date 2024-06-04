import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyPageSignUpForm.css';

const MyPageSignUpForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [interests, setInterests] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가
    const [userData, setUserData] = useState(null);

    const handleBirthDateChange = (event) => {
        setBirthDate(event.target.value);
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

    const translateInterest = (interest) => {
        switch (interest) {
            case '음악': return 'music';
            case '교육': return 'education';
            case '미술': return 'art';
            case '과학': return 'science';
            case '디자인': return 'design';
            default: return interest;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/member/myinfo', { withCredentials: true });
                setUserData(response.data);
                setBirthDate(response.data.birth); // 생년월일 초기화
                setInterests(response.data.interests.map(translateInterest)); // 관심사 초기화 및 번역
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' || type === 'radio' ? checked : value;

        // 라디오 버튼의 값을 올바르게 설정하기 위한 코드 추가
        if (type === 'radio') {
            setUserData({
                ...userData,
                [name]: e.target.id === "children_y" || e.target.id === "married" ? true : false
            });
        } else {
            setUserData({
                ...userData,
                [name]: newValue
            });
        }
    };

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setInterests((prevInterests) => 
            checked ? [...prevInterests, id] : prevInterests.filter((interest) => interest !== id)
        );
    };

    const handleEdit = () => {
        setIsEditing(true);
        alert('수정버튼을 누른 후에 저장하기 버튼을 눌러주세요');
    };

    const handleSave = async () => {
        try {
            const updatedUserData = {
                ...userData,
                birth: birthDate,
                interests,
                password: userData.password || '', // 패스워드가 null일 경우 빈 문자열로 설정
            };
    
            const response = await axios.post('/member/update', updatedUserData, { withCredentials: true });
    
            if (response.status === 200) {
                alert('정보가 성공적으로 저장되었습니다.');
                setIsEditing(false); // 저장 후 수정 모드 종료
            } else {
                alert('정보 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error saving user data:', error);
            alert('정보 저장 중 오류가 발생했습니다.');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post('/member/delete', {}, { withCredentials: true });

            if (response.status === 200) {
                alert('회원 탈퇴가 완료되었습니다.');
                window.location.href = '/';
            } else {
                alert('회원 탈퇴에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('회원 탈퇴 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className='MyAll' style={{ fontFamily: '"Noto Sans KR", sans-serif' }} >
            <div className="MysignUp_form">
                <div className="Mytitle">정보수정</div>
                <div className="Myline"></div>
                <div className="MysignUp_center">
                    <div className="Mysubtitle">
                        <div id="Mysubtitle1">
                            <div>기본 정보 입력</div>
                            <text>*은 필수 입력 사항입니다.</text>
                        </div>
                        <div className="Mybase_info">
                            <div className="Mybase_left">
                                <ul className="Mybase_left1">
                                    <li>이름</li>
                                    <li>아이디</li>
                                    <li>* 비밀번호</li>
                                    <li>생년월일</li>
                                    <li>* 휴대폰 번호</li>
                                    <li>전화번호</li>
                                    <li>이메일</li>
                                    <li>주소</li>
                                    <li>상세주소</li>
                                </ul>
                                <ul className="Mybase_left2">
                                    <li>* 메일수신동의</li>
                                    <li>* 문자수신동의</li>
                                    <li>* 우편수신동의</li>
                                </ul>
                            </div>
                            <div className="Mybase_right">
                                <ul className="Mybase_right1">
                                    <li>
                                        <input 
                                            id="name" 
                                            type='text'
                                            name='name'
                                            value={userData.name}
                                            readOnly
                                        />
                                    </li>

                                    <li>
                                        <input 
                                            id="id" 
                                            type='text'
                                            name='id'
                                            value={userData.id}
                                            readOnly
                                        />
                                    </li>

                                    <li>
                                        <input 
                                            id="password" 
                                            type='text'
                                            name='password'
                                            value={userData.password}
                                            onChange={handleInputChange}
                                            readOnly={!isEditing}
                                        />
                                    </li>
                                    
                                    <li>
                                        <input 
                                            htmlFor='birthDate'
                                            type='date' 
                                            id='birthDate' 
                                            name='birthDate' 
                                            value={birthDate} 
                                            onChange={handleBirthDateChange}
                                            readOnly 
                                        />&nbsp;&nbsp;&nbsp;
                                    </li>

                                    <li>
                                        <input 
                                            type='text' 
                                            id='mobileNumber' 
                                            name='phone_number' 
                                            value={userData.phone_number}
                                            onChange={handlePhoneNumberChange}
                                            readOnly={!isEditing}
                                        />
                                    </li>

                                    <li>
                                        <input 
                                            type="text"  
                                            id='phoneNumber' 
                                            name='telNumber' 
                                            value={userData.telNumber}
                                            onChange={handleInputChange}
                                            readOnly={!isEditing}
                                        />
                                    </li>

                                    <li>
                                        <input 
                                            id="mypageEmail" 
                                            type='email'
                                            name='email'
                                            value={userData.email}
                                            onChange={handleInputChange}
                                            readOnly={!isEditing}
                                        />
                                    </li>

                                    <li>
                                        <input 
                                            id="address" 
                                            type='text' 
                                            name='address' 
                                            className='addressInput1'
                                            value={userData.address}
                                            onChange={handleInputChange}
                                            readOnly={!isEditing}
                                        />
                                    </li>

                                    <li>
                                        <input 
                                            id="detail_address" 
                                            type='text'
                                            name='detail_address'
                                            className='addressInput2' 
                                            value={userData.detail_address}
                                            onChange={handleInputChange}
                                            readOnly={!isEditing}
                                        />
                                    </li>
                                </ul>
                                <ul className="Mybase_right2">
                                    <li>
                                        <input 
                                            type="radio" 
                                            className="radio" 
                                            name="email_agreement" 
                                            id="email_reception" 
                                            checked={userData.email_agreement === true}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="email_reception">동의</label>
                                        <input 
                                            type="radio" 
                                            className="radio" 
                                            name="email_agreement" 
                                            id="email_Not_reception" 
                                            checked={userData.email_agreement === false}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="email_Not_reception">비동의</label>
                                    </li>
                                    <li>
                                        <input 
                                            type="radio" 
                                            className="radio" 
                                            name="message_agreement" 
                                            id="message_reception" 
                                            checked={userData.message_agreement === true}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="message_reception">동의</label>
                                        <input 
                                            type="radio" 
                                            className="radio" 
                                            name="message_agreement" 
                                            id="message_Not_reception" 
                                            checked={userData.message_agreement === false}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="message_Not_reception">비동의</label>
                                    </li>
                                    <li>
                                        <input 
                                            type="radio" 
                                            className="radio" 
                                            name="mail_agreement" 
                                            id="mail_reception" 
                                            checked={userData.mail_agreement === true}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="mail_reception">동의</label>
                                        <input 
                                            type="radio" 
                                            className="radio" 
                                            name="mail_agreement" 
                                            id="mail_Not_reception" 
                                            checked={userData.mail_agreement === false}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="mail_Not_reception">비동의</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="Mysubtitle">
                        <div id="Mysubtitle2">
                            <div>부가 정보 입력</div>
                        </div>
                        <div className="Myadded_info">
                            <div className="Myadded_left">
                                <ul className="Myadded_left1">
                                    <li>관심사</li>
                                    <li>결혼여부</li>
                                    <li>자녀유무</li>
                                </ul>
                            </div>
                            <div className="Myadded_right">
                                <ul className="Myadded_right1">
                                    <li>
                                        <input 
                                            type="checkbox" 
                                            className="checkbox" 
                                            name="interest" 
                                            id="music" 
                                            checked={interests.includes('music')}
                                            onChange={handleCheckboxChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="music">음악</label>
                                        <input 
                                            type="checkbox" 
                                            className="checkbox" 
                                            name="interest" 
                                            id="education" 
                                            checked={interests.includes('education')}
                                            onChange={handleCheckboxChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="education">교육</label>
                                        <input 
                                            type="checkbox" 
                                            className="checkbox" 
                                            name="interest" 
                                            id="art" 
                                            checked={interests.includes('art')}
                                            onChange={handleCheckboxChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="art">미술</label>
                                        <input 
                                            type="checkbox" 
                                            className="checkbox" 
                                            name="interest" 
                                            id="science" 
                                            checked={interests.includes('science')}
                                            onChange={handleCheckboxChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="science">과학</label>
                                        <input 
                                            type="checkbox" 
                                            className="checkbox" 
                                            name="interest" 
                                            id="design" 
                                            checked={interests.includes('design')}
                                            onChange={handleCheckboxChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="design">디자인</label>
                                    </li>
                                    <li>
                                        <input 
                                            type="radio" 
                                            className="radio" 
                                            name="married" 
                                            id="children_y" 
                                            checked={userData.married === true}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="children_y">기혼</label>
                                        <input 
                                            type="radio" 
                                            className="radio" 
                                            name="married" 
                                            id="children_n" 
                                            checked={userData.married === false}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="children_n">미혼</label>
                                    </li>
                                    <li>
                                        <input 
                                            type="radio" 
                                            className="radio" 
                                            name="hasChildren" 
                                            id="married" 
                                            checked={userData.hasChildren === true}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="married">있음</label>
                                        <input 
                                            type="radio" 
                                            className="radio" 
                                            name="hasChildren" 
                                            id="single" 
                                            checked={userData.hasChildren === false}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                        <label htmlFor="single">없음</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="MySibutton_container">
                            <button className="MySibutton" onClick={handleEdit}>수정하기</button>
                            <button className="MySibutton" onClick={handleSave}>저장하기</button>
                            <button className="MySibutton" onClick={handleDelete}>회원탈퇴</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPageSignUpForm;
