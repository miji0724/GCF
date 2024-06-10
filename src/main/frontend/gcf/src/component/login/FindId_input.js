import './FindId_input.css';
import { useState } from 'react';
import axios from 'axios';

const FindId_input = ({ onIdChange, onIdChangeError }) => {
    const [FindIdForm, setFindIdForm] = useState({
        name: '',
        email: '',
    });

    const handleFindId = (e) => {
        e.preventDefault();

        if (!FindIdForm.name || !FindIdForm.email) {
          alert('이름과 이메일을 입력해주세요.');
          return;
        }

        axios
            .post('/member/findId', FindIdForm)
            .then((response) => {
                if (response.status === 200) {
                    alert('인증에 성공하였습니다.');
                    const id = response.data;
                    onIdChange(id, FindIdForm.name);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    console.log(FindIdForm);
                    alert('존재하지 않는 회원이거나 잘못 입력된 정보입니다.');
                    onIdChangeError();
                } else {
                    alert('오류가 발생했습니다.');
                }
            });
    };

    return (
        <div className="findId_input">
            <div className="title">아이디 찾기</div>
            <div className="line"></div>
            <div id="findId_input_INFO">
                <ul>
                    <li>
                        <input
                            placeholder="이름 입력"
                            value={FindIdForm.name}
                            onChange={(e) => setFindIdForm({ ...FindIdForm, name: e.target.value })}
                        />
                    </li>
                    <li>
                        <input
                            placeholder='이메일 입력("@" 포함)'
                            value={FindIdForm.email}
                            onChange={(e) => setFindIdForm({ ...FindIdForm, email: e.target.value })}
                        />
                    </li>
                </ul>
                <button type="submit" id="findId_btn" onClick={handleFindId}>
                    아이디 찾기
                </button>
            </div>
        </div>
    );
};

export default FindId_input;