import './FindPw.css';
import React, { useState } from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import FindPw_input from '../../component/login/FindPw_input';
import FindPw_show from '../../component/login/FindPw_show';
import FindPw_notExist from '../../component/login/FindPw_notExist';

const FindId = () => {

    const handleClick = (componentNumber) => {
      switch (componentNumber) {
        case 1:
          setComponentToShow(<FindPw_show />);
          break;
        case 2:
          setComponentToShow(<FindPw_notExist />);
          break;
        default:
          setComponentToShow(<FindPw_input handleButtonClick={handleClick} />);
      }
    };

    const [componentToShow, setComponentToShow] = useState(<FindPw_input handleButtonClick={handleClick} />);

    return (
        <div className="findPw">
            <Header />
            {componentToShow}
            <Footer />
        </div>
    );
}


export default FindId;