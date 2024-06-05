import ManageHeader from '../../component/manage/ManageHeader';
import ManageTeachAppDetail from '../../component/manage/ManageTeachAppDetail';
import './ManageTeachAppDetailPage.css';

function ManageTeachAppDetailPage(){
    return(
        <div className="ManageTeachAppDetailPage">
            <ManageHeader />
            <ManageTeachAppDetail />
        </div>
    );
}

export default ManageTeachAppDetailPage;