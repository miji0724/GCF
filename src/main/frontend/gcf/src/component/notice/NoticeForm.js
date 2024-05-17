import './NoticeForm.css';
import React, { useState } from 'react';

const items = Array.from({ length: 30 }, (_, index) => index + 1); 

const ITEMS_PER_PAGE = 8; 

const NoticeForm = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPageItems = items.slice(startIndex, endIndex);

    const nextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('전체검색');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    return(
        <div className="notice_form">
            <div className="title">공지사항</div>
            <div className="line"></div>
            <div className="count_item">총 {items.length}건 / {totalPages} 페이지</div>
            <div className="grid-container">
                {currentPageItems.map((item, index) => (
                <div key={index} className="grid-item">{item}</div>
                ))}
            </div>
            <div className="notice_search">
                <div className="notice_search_dropdown">
                    <div className="notice_dropdown-toggle" onClick={toggleDropdown}>
                        {selectedItem} {isOpen ? '▴' : '▾'}
                    </div>
                    {isOpen && (
                        <div className="notice_dropdown-content">
                        <p onClick={() => handleItemClick('전체검색')}>전체검색</p>
                        <p onClick={() => handleItemClick('제목')}>제목</p>
                        <p onClick={() => handleItemClick('내용')}>내용</p>
                        </div>
                    )}
                </div>
                <input type="text"></input>
            </div>
            <div className="notice_page_btn_area">
                <button onClick={prevPage} disabled={currentPage === 1} className="notice_page_btn">{'<'}</button>
                <span> {currentPage} / {totalPages} </span>
                <button onClick={nextPage} disabled={currentPage === totalPages} className="notice_page_btn">{'>'}</button>
            </div>
        </div>
    );
}

export default NoticeForm;