import React from 'react';
import Header from '../../component/Header';
import AuthenticationForm from "../../component/myPage/AuthenticationForm";
import Footer from '../../component/Footer';
import './MyPageAuthenticationForm.css';

function MyPageAuthenticationForm() {
    return (
        <div className='MyPageAuthenticationForm'>
            <Header />
            <AuthenticationForm />
            <Footer />
        </div>
    );
}

export default MyPageAuthenticationForm;
