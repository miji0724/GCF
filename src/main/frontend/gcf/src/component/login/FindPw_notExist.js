import './FindPw_notExist.css';

const FindPw_notExist = () => {

    const str = "❗\n\n존재하지 않는 회원입니다.";

    return (
        <div className="findPw_notExist">
            <div className="title">비밀번호 찾기</div>
            <div className="line"></div>
            <div id="findPw_show_notExist">
                <div className="show_notExist">
                    {str}
                </div>
                <button type="submit" id="go_signUp"><a href="/signUp">회원가입 하기</a></button>
            </div>
        </div>
    )
}

export default FindPw_notExist;