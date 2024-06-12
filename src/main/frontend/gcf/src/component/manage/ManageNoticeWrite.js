import React, { useState, useRef, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ManageNoticeWrite.css';
import SideMenu from './ManageSideMenu';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function ManageNoticeWrite() {
    const [attachments, setAttachments] = useState([]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const { id } = useParams();
    const location = useLocation();
    const { getNotice } = location.state || {};
    const editorRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (getNotice) {
            const notice = getNotice;
            setTitle(notice.title);
            if (notice.content) {
                try {
                    const parsedContent = JSON.parse(notice.content);
                    const contentState = convertFromRaw(parsedContent);
                    setEditorState(EditorState.createWithContent(contentState));
                } catch (error) {
                    console.error('Error parsing content:', error);
                }
            }
        }
    }, [getNotice]);

    const handleBack = () => {
        navigate(-1); //뒤로가기
      };

    const prepareNoticeData = () => {
        if (!title || !editorState.getCurrentContent().hasText()) {
            setError('제목과 내용을 작성해주세요.');
            return null;
        }

        return {
            title,
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        };
    };

    const createFormData = (noticeData) => {
        const formData = new FormData();
        formData.append('noticeDto', JSON.stringify(noticeData));

        attachments.forEach((file) => {
            formData.append('files', file);
        });

        if (id) {
            formData.append('id', id);
        }

        return formData;
    };

    const sendNoticeAndAttachments = async () => {
        const noticeData = prepareNoticeData();
        if (!noticeData) return;

        const formData = createFormData(noticeData);
        const method = id ? 'PUT' : 'POST';

        try {
            const response = await axios({
                method,
                url: id ? `http://localhost:8090/manage/notices/${id}` : 'http://localhost:8090/manage/notices',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
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
                <a className='back_button' href='javascript:history.back()'>목록으로 돌아가기 &gt;</a>
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
                    <div className='noticewrite_button_area'>
                    <button className='noticewrite_confirm' onClick={sendNoticeAndAttachments}>
                        {id ? '수정' : '등록'}
                    </button>
                    <button className='noticewrite_cancel' onClick={handleBack} >
                        취소
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageNoticeWrite;