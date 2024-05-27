import React, { useState, useRef, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ManageNoticeWrite.css';
import SideMenu from './ManageSideMenu';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';


function ManageNoticeWrite() {
    const [attachments, setAttachments] = useState([]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    // const navigate = useNavigate();
    const { id } = useParams(); // URL에서 공지사항 ID 가져오기
    const location = useLocation();
    const { getNotice } = location.state || {};

    const editorRef = useRef(null);



    useEffect(() => {
        if (getNotice) {
            setTitle(getNotice.title);
            if (getNotice.content) {
                try {
                    // JSON 문자열을 JavaScript 객체로 파싱
                    const parsedContent = JSON.parse(getNotice.content);

                    // JavaScript 객체를 contentState로 변환
                    const contentState = convertFromRaw(parsedContent);

                    console.log(contentState);

                    // contentState 설정
                    setEditorState(EditorState.createWithContent(contentState));

                } catch (error) {
                    console.error('Error parsing content:', error);
                }
            }
        }
    }, [getNotice]);



    const sendNoticeAndAttachments = async () => {
        const noticeData = {
            title,
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent())), // JSON 문자열로 변환하여 전송
        };

        try {
            const formData = new FormData();

            // 공지사항 정보를 FormData에 추가
            formData.append('noticeDto', new Blob([JSON.stringify(noticeData)], { type: 'application/json' }));

            // 첨부파일 정보를 FormData에 추가
            if (attachments && attachments.length > 0) {
                attachments.forEach((file) => {
                    formData.append('files', file);
                });
            }

            // FormData의 각 항목을 콘솔에 출력
            for (const [key, value] of formData.entries()) {
                console.log(key, value instanceof File ? 'File' : typeof value);
            }

            const response = await axios.post('http://localhost:8090/notices', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Notice and attachments uploaded successfully:', response.data);
            window.location.href = '/manage/notice';
            return response.data;
        } catch (error) {
            console.error('Error uploading notice and attachments:', error);
            throw new Error('Notice and attachments upload failed. Please try again later.');
        }
    };



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

    return (
        <div className='noticewrite_container'>
            <SideMenu />
            <div className='noticewrite'>
                <p>공지사항 생성/수정</p>
                <a className='back_button' href='/manage/notice'>목록으로 돌아가기 &gt;</a>
                <div className='noticewrite_area'>
                    {error && <div className="error">{error}</div>}
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
                                    {file && <span>{file.name}</span>} {/* 파일 이름 표시 */}
                                </div>
                            ))}
                            <button onClick={addInput}>첨부파일 추가</button>
                        </div>
                    </div>
                    <button className='noticewrite_confirm' onClick={sendNoticeAndAttachments}>
                        {id ? '수정' : '등록'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ManageNoticeWrite;