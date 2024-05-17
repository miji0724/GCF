import './SignUp.css';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import SignUpForm from '../../component/signUp/SignUpForm';

const SignUp = () => {
    return (
        <div className="signUp">
            <Header />
            <SignUpForm />
            <Footer />
        </div>
    );
}


export default SignUp;