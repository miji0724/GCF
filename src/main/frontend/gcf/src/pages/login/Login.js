import './Login.css';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import LoginForm from '../../component/login/LoginForm';

const Login = () => {
    return (
        <div className="login">
            <Header />
            <LoginForm />
            <Footer />
        </div>
    );
}


export default Login;
