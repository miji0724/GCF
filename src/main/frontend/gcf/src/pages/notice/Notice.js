import './Notice.css';
import { Route, Routes } from 'react-router-dom';
import NoticeForm from '../../component/notice/NoticeForm';
import NoticeDetail from '../../component/notice/NoticeDetail';

const Notice = () => {
    return (
        <div className="notice">
            <Routes>
                <Route path="/" element={<NoticeForm />} />
                <Route path=":id" element={<NoticeDetail />} />
            </Routes>
        </div>
    );
};


export default Notice;