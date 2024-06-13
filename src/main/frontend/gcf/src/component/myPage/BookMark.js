import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookMark.css';

function BookMark() {
  const [offBookmarks, setOffBookmarks] = useState([]);
  const [onBookmarks, setOnBookmarks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Offline');

  useEffect(() => {
    axios.get('/api/offBookMarks')
      .then(response => {
        console.log("Offline Bookmarks: ", response.data);
        setOffBookmarks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the offline bookmarks!", error);
      });

    axios.get('/api/onBookMarks')
      .then(response => {
        console.log("Online Bookmarks: ", response.data);
        setOnBookmarks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the online bookmarks!", error);
      });
  }, []);

  const filteredBookmarks = selectedCategory === 'Offline' ? offBookmarks : onBookmarks;

  return (
    <div className='All'>
      <div className='boCenterContainer'>
        <div className='OnlineState'>관심 교육/체험</div>
        <div className='CenterMenuContainer' id="bookMark_center_menu">
          <ul className='CenterMenu'>
            <li 
              className={selectedCategory === 'Offline' ? 'selected' : ''}
              onClick={() => setSelectedCategory('Offline')}
            >
              교육/체험
            </li>
            <li 
              className={selectedCategory === 'Online' ? 'selected' : ''}
              onClick={() => setSelectedCategory('Online')}
            >
              온라인 교육
            </li>
          </ul>
        </div>
        <div className='TableContainer'>
          <table className='ProgramTable'>
            <thead>
              <tr>
                <th>번호</th>
                <th>회원</th>
                <th>프로그램</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookmarks.map((bookmark, index) => (
                <tr key={bookmark.id}>
                  <td>{bookmark.id}</td>
                  <td>{bookmark.member.id}</td>
                  <td>{selectedCategory === 'Offline' ? bookmark.offProgram.id : bookmark.onProgram.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookMark;
