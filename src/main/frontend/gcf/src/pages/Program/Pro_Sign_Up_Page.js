import './Pro_Sign_Up_Page.css';
import Pro_Sign_Up_Page from '../../component/Program/Pro_Sign_Up';


function Post_Sign_Up_Page({isLoggedIn,userId}) {
    return(
        <div className='Post_SingUp'>
            <Pro_Sign_Up_Page isLoggedIn={isLoggedIn} userId = {userId}/>
        </div>
    );
}

export default Post_Sign_Up_Page;