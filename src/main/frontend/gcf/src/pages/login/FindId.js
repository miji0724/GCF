import './FindId.css';
import React, { useState } from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import FindId_input from '../../component/login/FindId_input';
import FindId_show from '../../component/login/FindId_show';
import FindId_notExist from '../../component/login/FindId_notExist';

const FindId = () => {

    const handleClick = (componentNumber) => {
      switch (componentNumber) {
        case 1:
          setComponentToShow(<FindId_show />);
          break;
        case 2:
          setComponentToShow(<FindId_notExist />);
          break;
        default:
          setComponentToShow(<FindId_input handleButtonClick={handleClick} />);
      }
    };

    const [componentToShow, setComponentToShow] = useState(<FindId_input handleButtonClick={handleClick} />);

    return (
        <div className="findId">
            <Header />
            {componentToShow}
            <Footer />
        </div>
    );
}


export default FindId;