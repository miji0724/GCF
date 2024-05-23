import './Login.css';
import LoginForm from '../../component/login/LoginForm';

const Login = ({ onLogin }) => {
    return (
        <div className="login">
            <LoginForm onLogin={onLogin} />
        </div>
    );
}


export default Login;