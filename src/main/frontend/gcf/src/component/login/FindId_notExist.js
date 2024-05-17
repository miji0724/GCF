import './FindId_notExist.css';

const FindId_notExist = () => {

    const str = "❗\n\n존재하지 않는 회원입니다.";

    return (
        <div className="findId_notExist">
            <div className="title">아이디 찾기</div>
            <div className="line"></div>
            <div id="findId_show_notExist">
                <div className="show_notExist">
                    {str}
                </div>
                <button type="submit" id="go_signUp"><a href="/signUp">회원가입 하기</a></button>
            </div>
        </div>
    )
}

export default FindId_notExist;