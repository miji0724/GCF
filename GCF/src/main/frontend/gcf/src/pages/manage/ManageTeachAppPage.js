import ManageHeader from '../../component/manage/ManageHeader';
import ManageTeachApp from '../../component/manage/ManageTeachApp';
import './ManageTeachAppPage.css'

function ManageTeachAppPage(){
    return(
        <div className="ManageTeachAppPage">
            <ManageHeader />
            <ManageTeachApp />
        </div>
    );
}

export default ManageTeachAppPage;