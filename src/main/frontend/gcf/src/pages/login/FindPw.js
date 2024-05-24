import './FindPw.css';
import FindPw_input from '../../component/login/FindPw_input';
import FindPw_show from '../../component/login/FindPw_show';
import FindPw_notExist from '../../component/login/FindPw_notExist';
import { useState } from 'react';

const FindPw = () => {

    const [email, setEmail] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState(false);

    const handlePwChange = (foundEmail) => {
        setEmail(foundEmail);
        setShowPw(true);
        setError(false); // 비밀번호를 찾으면 에러 초기화
    };

    const handlePwChangeError = () => {
        setError(true);
    };

    return (
      <div className="findPw">
          {!showPw && !error && <FindPw_input onPwChange={handlePwChange} onPwChangeError={handlePwChangeError} />}
          {showPw && <FindPw_show email={email}  />}
          {error && <FindPw_notExist />}
      </div>
    );
}


export default FindPw;