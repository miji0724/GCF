import React, { useState, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ManageNoticeWrite.css';
import SideMenu from './ManageSideMenu';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';


function ManageNoticeWrite() {
    const [attachments, setAttachments] = useState([]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 공지사항 ID 가져오기
    const location = useLocation();
    const { getNotice } = location.state || {};

    const editorRef = useRef(null);

    const prepareNoticeData = () => {
        const noticeData = {
            title: title,
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            views: 0,
            author: ''
        };

        return noticeData;
    };

    const handleNoticeAction = async () => {
        try {
            const noticeData = prepareNoticeData();

            // console.log(prepareNoticeData); //디버깅용

            // title 또는 content가 null인 경우 경고 메시지 표시
            if (!noticeData.title || !noticeData.content) {
                setError('제목과 내용을 입력해주세요.');
                return;
            }

            // 공지사항 데이터 전송
            const createdNotice = await sendNoticeData(noticeData);

            // 생성된 공지사항 ID를 사용하여 첨부파일 업로드
            await sendAttachments(attachments);


            if (id) {
                console.log('Notice updated successfully:', createdNotice);
            } else {
                console.log('Notice created successfully:', createdNotice);
            }

            // 리다이렉션 로직 추가
            navigate('/manage/notice');

        } catch (error) {
            console.error('Error handling notice action:', error);
            setError(error.message);
        }
    };

    const sendNoticeData = async (noticeData) => {
        try {
            // console.log('noticeData : ');
            // console.log(noticeData);

            let url = 'http://localhost:8090/notices'
            let method = 'POST'

        // id가 존재하면 수정 요청을 보내도록 설정
        if (id) {
            url += `/${id}`;
            method = 'PUT'; // 또는 'PATCH'를 사용할 수도 있습니다.
        }

            const response = await axios({
                method: method, // 새 공지사항을 생성하는 경우 항상 POST 요청을 사용
                url: url,
                data: noticeData,
                headers: {
                    'Content-Type': 'application/json', // JSON 형식으로 데이터를 전송
                },
            });

            console.log('Notice created successfully:', response.data);
            return response.data; // 생성된 공지사항 데이터 반환

        } catch (error) {
            console.error('Error creating notice:', error);
            throw new Error('Notice creation failed. Please try again later.');
        }
    };

    const sendAttachments = async (attachments) => {
        try {
            const formData = new FormData();
    
            console.log('formdata : ');
            console.log(formData); // 디버깅 용
    
            if (attachments.length > 0) {
                attachments.forEach((file) => {
                    formData.append('files', file); // 서버에서 `files`로 받도록 되어있음
                });
            } else {
                // 파일이 없는 경우에도 빈 formData 전송
                formData.append('files', new Blob([]), 'empty.txt');
            }
    
            const response = await axios.post(`http://localhost:8090/attachments`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // 파일 업로드를 위해 multipart/form-data 형식 사용
                }
            });
    
            console.log('Attachments uploaded successfully:', response.data);
    
        } catch (error) {
            console.error('Error uploading attachments:', error);
            throw new Error('Attachment upload failed. Please try again later.');
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
                        <input type='text' value={getNotice ? getNotice.title : title} onChange={handleTitleChange} />
                    </div>
                    <div className='noticewrite_detail'>
                        <Editor
                            editorState={getNotice ? EditorState.createWithContent(convertFromRaw(JSON.parse(getNotice.content))) : editorState}
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
                    {id ? (
                        <button className='noticewrite_confirm' onClick={handleNoticeAction}>수정</button>
                    ) : (
                        <button className='noticewrite_confirm' onClick={handleNoticeAction}>등록</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageNoticeWrite;
