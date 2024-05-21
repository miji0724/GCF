import React, { useState, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ManageNoticeWrite.css';
import SideMenu from './ManageSideMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ManageNoticeWrite() {
    const [attachments, setAttachments] = useState([]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

    const editorRef = useRef(null);

    const handleEditorChange = (editorState) => {
        setEditorState(editorState);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleFileChange = (index, event) => {
        const newAttachments = [...attachments];
        newAttachments[index] = event.target.files[0];
        setAttachments(newAttachments);
    };

    const addInput = () => {
        setAttachments([...attachments, null]);
    };

    const removeInput = index => {
        const newAttachments = attachments.filter((_, i) => i !== index);
        setAttachments(newAttachments);
    };

    const prepareNoticeData = () => {
        const noticeData = {
            title: title,
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            views: 0,
            author: '관리자',
            attachments: [] // 첨부 파일 배열
        };

        // attachments 배열에 파일 추가
        attachments.forEach((file, index) => {
            if (file) {
                noticeData.attachments.push({
                    name: `attachment_${index}`, // 파일 이름
                    file: file // 파일 자체
                });
            }
        });

        return noticeData;
    };

    const handleSubmit = async () => {
        try {
            const noticeData = prepareNoticeData();

            // POST 요청 보내기
            const response = await axios.post('http://localhost:8090/notice/create', noticeData);
            console.log('Notice submitted successfully:', response.data);

            // 리다이렉션 로직 추가
            navigate('/manage/notice'); // useNavigate 훅을 사용하여 리다이렉션

        } catch (error) {
            console.error('Error submitting notice:', error);
            setError('Notice submission failed. Please try again later.'); // 에러 메시지 설정
        }
    };

    return (
        <div className='noticewrite_container'>
            <SideMenu />
            <div className='noticewrite'>
                <p>공지사항 생성/수정</p>
                <a className='back_button' href='/manage/notice'>목록으로 돌아가기 &gt;</a>
                <div className='noticewrite_area'>
                    {error && <div className="error">{error}</div>} {/* 에러 메시지 표시 */}
                    <div className='noticewrite_title'>
                        <p>제목</p>
                        <input type='text' value={title} onChange={handleTitleChange} />
                    </div>
                    <div className='noticewrite_detail'>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={handleEditorChange}
                            ref={editorRef}
                        />
                    </div>
                    <div className='noticeWrite_attachArea'>
                        <p>첨부파일</p>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {attachments.map((file, index) => (
                                <div key={index} className='custom_file_input'>
                                    <input
                                        type='file'
                                        onChange={e => handleFileChange(index, e)}
                                    />
                                    <button onClick={() => removeInput(index)}>삭제</button>
                                </div>
                            ))}
                            <button onClick={addInput}>첨부파일 추가</button>
                        </div>
                    </div>
                    <button className='noticewrite_confirm' onClick={handleSubmit}>등록</button>
                </div>
            </div>
        </div>
    );
}

export default ManageNoticeWrite;
