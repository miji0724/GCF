import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import view from '../../img/view.png';
import calendar from '../../img/calendar.png';
import './NoticeDetail.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const NoticeDetail = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    
    const isJsonString = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };
    
    useEffect(() => {
        const fetchNotice = () => {
            axios.get(`/notices/${id}`)
                .then(response => {
                    setNotice(response.data);
                    if (response.data.content && isJsonString(response.data.content)) {
                        const contentState = convertFromRaw(JSON.parse(response.data.content));
                        setEditorState(EditorState.createWithContent(contentState));
                    } else {
                        setEditorState(null);
                    }
                })
                .catch(error => {
                    console.error('Failed to fetch notice details.', error);
                });
        };

        fetchNotice();
    }, [id]);

    if (!notice) {
        return null;
    }

    const date = new Date(notice.createdAt);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    return (
        <div className="noticeDetail">
            <div className="noticeBody">
                <h2 className="noticeTitle">{notice.title}</h2>
                <div className="date_view"><img src={calendar} className="calendarImg" />{formattedDate} <img src={view} className="viewImg" /> {notice.views}</div>
                <div className="n_line"></div>
                <div className="noticeContent">
                    {editorState ? (
                        <Editor
                            editorState={editorState}
                            readOnly={true}
                            toolbarHidden={true} // 툴바를 숨깁니다.
                        />
                    ) : (
                        <div>{notice.content}</div>
                    )}
                </div>
                <div className="n_line_bt"></div>
                <div className="return_list"><a href="/notice" className="return_list_btn">목록</a></div>
            </div>
        </div>
    );
};

export default NoticeDetail;