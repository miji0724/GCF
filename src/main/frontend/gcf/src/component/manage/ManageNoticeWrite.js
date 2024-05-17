import React, { useState, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ManageNoticeWrite.css';
import SideMenu from './ManageSideMenu';

function backToList() {
    window.location.href = '/manage/notice';
}

const CustomFileInput = ({ onChange, onDelete, fileName }) => {
    const fileInputRef = useRef(null);

    return (
        <div className='custom_file_input'>
            <input
                type='text'
                value={fileName ? fileName : '파일을 선택해주세요.'}
                readOnly
                className='attachment'
            />
            <input
                type='file'
                onChange={onChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <button onClick={() => fileInputRef.current.click()}>파일 선택</button>
            {fileName && <button onClick={onDelete}>삭제</button>}
        </div>
    );
};

function ManageNoticeWrite() {
    const [attachments, setAttachments] = useState([{ file: null }]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const addInput = () => {
        setAttachments([...attachments, { file: null }]);
    };

    const removeInput = index => {
        const newAttachments = attachments.filter((_, i) => i !== index);
        setAttachments(newAttachments);
    };

    const handleFileChange = (index, event) => {
        const newAttachments = [...attachments];
        newAttachments[index] = { file: event.target.files[0] };
        setAttachments(newAttachments);
    };

    return (
        <body>
            <div className='noticewrite_container'>
                <SideMenu />
                <div className='noticewrite'>
                    <p>공지사항 생성/수정</p>
                    <a className='back_button' onClick={backToList}>목록으로 돌아가기 &gt;</a>
                    <div className='noticewrite_area'>
                        <div className='noticewrite_title'>
                            <p>제목</p>
                            <input type='text' />
                        </div>
                        <div className='noticewrite_detail'>
                            {/* WYSIWYG 편집기 */}
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                            />
                        </div>
                        <div className='noticeWrite_attachArea'>
                            <p>첨부파일</p>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {attachments.map((attachment, index) => (
                                    <CustomFileInput
                                        key={index}
                                        fileName={attachment.file ? attachment.file.name : null}
                                        onChange={e => handleFileChange(index, e)}
                                        onDelete={() => removeInput(index)}
                                    />
                                ))}
                                <button onClick={addInput}>첨부파일 추가</button>
                            </div>
                        </div>
                        <button className='noticewrite_confirm'>등록</button>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default ManageNoticeWrite;