import ManageHeader from '../../component/manage/ManageHeader';
import ManageTeacher from '../../component/manage/ManageTeacher';
import './ManageTeacherPage.css'

function ManageTeacherPage(){
    return(
        <div className="ManageTeacherPage">
            <ManageHeader />
            <ManageTeacher />
        </div>
    );
}

export default ManageTeacherPage;