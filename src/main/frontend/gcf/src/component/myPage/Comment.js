import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Comment.css';

function Comment() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('/api/comments')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the comments!", error);
      });
  }, []);

  return (
    <div className='All' style={{ fontFamily: '"Noto Sans KR", sans-serif' }} >
      <div className='CenterContainer'>
        <div className='State_title'>작성 댓글</div>
        <div className='CenterMenuContainer'>
          <ul className='CenterMenu'>
            <li>번호</li>
            <li>작성일</li>
            <li>댓글내용</li>
            <li>답글여부</li>
          </ul>
        </div>
        <div className="TableContainer">
          <table className="CommentTable">
            <tbody>
              {comments.map((comment, index) => (
                <tr key={comment.id}>
                <td>{index + 1}</td>
                <td>{new Date(comment.createdDate).toLocaleDateString()}</td>
                <td>{comment.content}</td>
                <td>{comment.isReply ? "Yes" : "No"}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Comment;
