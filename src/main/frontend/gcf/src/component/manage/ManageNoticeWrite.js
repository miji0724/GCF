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
            console.log(getNotice);
            const notice = JSON.parse(getNotice);
            console.log(notice.attachments);
            if (notice.attachments) {
                const allAttachments = notice.attachments.map(file => ({
                    name: file.original_name,
                    file: file, // 파일 객체의 정보를 모두 포함하여 초기화
                }));
                setAttachments(allAttachments);
            }
            if (notice) {
                setTitle(notice.title);
                if (notice.content) {
                    try {
                        // JSON 문자열을 JavaScript 객체로 파싱
                        const parsedContent = JSON.parse(notice.content);

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
        }
    }, [getNotice]);

    const prepareNoticeData = () => {
        if (!title || !editorState.getCurrentContent().hasText()) {
            setError('제목과 내용을 작성해주세요.');
            return null;
        }

        const noticeData = {
            title,
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        };

        return noticeData;
    };

    const createFormData = (noticeData) => {
        const formData = new FormData();

        formData.append('noticeDto', JSON.stringify(noticeData));

        if (attachments && attachments.length > 0) {
            attachments.forEach((file) => {
                formData.append('files', file);
            });
        }

        if (id) {
            formData.append('id', id);
        }

        return formData;
    };

    const sendNoticeAndAttachments = async () => {
        const noticeData = prepareNoticeData();

        if (!noticeData) {
            return;
        }

        const formData = createFormData(noticeData);
        const method = id ? 'PUT' : 'POST';

        // FormData의 각 항목을 콘솔에 출력
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await axios({
                method,
                url: id ? `http://localhost:8090/notices/${id}` : 'http://localhost:8090/notices',
                data: formData,
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
                <p>{id ? '공지사항 수정' : '공지사항 등록'}</p>
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
                                    <label>
                                        <span>{file ? file.name : '파일 선택'}</span>
                                        <input
                                            type='file'
                                            style={{ display: 'none' }}
                                            onChange={e => handleFileChange(index, e)}
                                        />
                                    </label>
                                    <button onClick={() => removeInput(index)}>삭제</button>
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