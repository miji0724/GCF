import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageNotice.css';
import SideMenu from './ManageSideMenu';

function noticeWrite() {
    window.location.href = '/manage/noticewrite';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function ManageNotice() {
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

    useEffect(() => {
        axios.get('http://localhost:8090/notice')
            .then(response => {
                const sortedNotices = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setNotices(sortedNotices);
            })
            .catch(error => {
                console.error('Error fetching notices:', error);
            });
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = notices.slice(indexOfFirstItem, indexOfLastItem);

    const handleDelete = (id) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            axios.delete(`http://localhost:8090/notice/${id}`)
                .then(response => {
                    // 삭제 성공시에는 해당 공지사항을 제외한 새로운 목록으로 업데이트
                    const updatedNotices = notices.filter(item => item.id !== id);
                    setNotices(updatedNotices);
                })
                .catch(error => {
                    console.error('Error deleting notice:', error);
                });
        }
    };

    const handleEdit = (id) => {
        // 편집할 공지의 ID를 사용하여 해당 공지를 수정하는 페이지로 이동
        window.location.href = `/manage/noticewrite/${id}`;
    };

    return (
        <div className='manageNotice_container'>
            <SideMenu />
            <div className='manageNotice'>
                <p>공지사항 관리</p>
                <button className='manageNotice_button' onClick={noticeWrite}>글쓰기</button>
                <div className='manageNotice_area'>
                    <table className='manageNotice_table'>
                        <thead>
                            <tr>
                                <th className='manageNotice_id'>번호</th>
                                <th className='manageNotice_title'>제목</th>
                                <th className='manageNotice_writer'>작성자</th>
                                <th className='manageNotice_date'>날짜</th>
                                <th className='manageNotice_views'>조회수</th>
                                <th className='manageNotice_modify'>수정</th>
                                <th className='manageNotice_delete'>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{formatDate(item.created_at)}</td>
                                    <td>{item.views}</td>
                                    <td><button onClick={() => handleEdit(item.id)} className='modify_button'>수정</button></td>
                                    <td><button onClick={() => handleDelete(item.id)} className='delete_button'>삭제</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageNotice;
