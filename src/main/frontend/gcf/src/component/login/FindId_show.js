import './FindId_show.css'

const FindId_show = ( { id, name } ) => {

    return (
        <div className="findId_show">
            <div className="title">아이디 찾기</div>
            <div className="line"></div>
            <div id="findId_show_id">
                <div className="show_id">
                    ✔<br/><br/>{name}님의 아이디는<br/>{id}입니다.
                </div>
                <button type="submit" id="go_login"><a href="/login">로그인 하러가기</a></button>
            </div>
        </div>
    );
}

export default FindId_show;