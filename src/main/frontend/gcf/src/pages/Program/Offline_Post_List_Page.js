import './Offline_Post_List_Page.css';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import Offline_Post_List from '../../component/Program/Offline_Post_List'

function Offline_Posts_List() {
    return (
        <div className="Offline_Post_List">
            <Header />
            <Offline_Post_List />
            <Footer />
        </div>
    );
}


export default Offline_Posts_List;