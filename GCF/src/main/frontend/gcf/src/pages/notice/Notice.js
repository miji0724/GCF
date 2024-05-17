import './Notice.css';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import NoticeForm from '../../component/notice/NoticeForm';

const Notice = () => {
    return (
        <div className="notice">
            <Header />
            <NoticeForm />
            <Footer />
        </div>
    );
}


export default Notice;