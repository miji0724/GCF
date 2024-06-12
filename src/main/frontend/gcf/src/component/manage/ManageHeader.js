import './ManageHeader.css';
import logo from '../../img/logomanage.png';
import React from 'react';

const gotoManageHome = () => {
    window.location.href = '/manage';
};

const gotoHome = () => {
    window.location.href = '/';
}

function ManageHeader() {
    return (
        <header>
            <div className="header_content">
                <div className="logo">
                    <img src={logo} alt="Logo" onClick={gotoManageHome} />
                </div>
                <p className="manage_title">관리자 페이지</p>
                <div className="gotoHome" onClick={gotoHome}>
                    메인 페이지로 이동 &gt;
                </div>
            </div>
        </header >
    )
}

export default ManageHeader;