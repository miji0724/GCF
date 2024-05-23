import './FindId.css';
import FindId_input from '../../component/login/FindId_input';
import FindId_show from '../../component/login/FindId_show';
import FindId_notExist from '../../component/login/FindId_notExist';
import { useState } from 'react';

const FindId = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [showId, setShowId] = useState(false);
    const [error, setError] = useState(false);

    const handleIdChange = (foundId, username) => {
        setId(foundId);
        setName(username);
        setShowId(true);
        setError(false); // 아이디를 찾으면 에러를 초기화
    };

    const handleIdChangeError = () => {
        setError(true);
    };

    return (
        <div className="findId">
            {!showId && !error && <FindId_input onIdChange={handleIdChange} onIdChangeError={handleIdChangeError} />}
            {showId && <FindId_show id={id} name={name} />}
            {error && <FindId_notExist />}
        </div>
    );
};

export default FindId;