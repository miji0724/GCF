import './Offline_detail_Page.css';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import Offline_Details from '../../component/Program/Offline_detail';


function Offline_detail_Page() {
    return (
        <div className="Offline_detail">
            <Header />
            <Offline_Details />
            <Footer />
        </div>
    );
}


export default Offline_detail_Page;