import './Home.css';
import Body from '../component/Body'

const Home = ({ isLoggedIn }) => {
  
    return (
        <div className="home">
            <Body isLoggedIn={isLoggedIn} />
        </div>
    );
}


export default Home;
