import './FindPw_input.css'

const FindPw_input = ({ handleButtonClick }) => {

    const handleClick = (componentNumber) => {
      handleButtonClick(componentNumber);
    };

    return (
        <div className="findPw_input">
            <div className="title">비밀번호 찾기</div>
            <div className="line"></div>
            <div id="findPw_input_INFO">
                <ul>
                    <li><input placeholder='아이디 입력' /></li>
                    <li><input placeholder='이메일 입력("@" 포함)' /></li>
                </ul>
                <button type="submit" id="findPw_btn" onClick={() => handleClick(1)}>비밀번호 찾기</button>
                <button type="submit" onClick={() => handleClick(2)}>존재하지 않는 회원</button>
            </div>
        </div>
    );
}

export default FindPw_input;