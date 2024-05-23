package com.gcf.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Notice;
import com.gcf.spring.repository.AttachmentRepository;
import com.gcf.spring.repository.NoticeRepository;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;
    
    @Autowired
    private AttachmentRepository attachmentRepository;

    @Autowired
    private AttachmentService attachmentService;

    public Notice createNotice(Notice noticeRequest) {
        // 공지사항 정보를 DTO에서 엔티티로 변환
        Notice notice = new Notice();
        notice.setTitle(noticeRequest.getTitle());
        notice.setContent(noticeRequest.getContent());
        notice.setViews(noticeRequest.getViews());
        notice.setAuthor(noticeRequest.getAuthor());

        // 공지사항을 저장하고 저장된 공지사항 반환
        return noticeRepository.save(notice);
    }




    // 모든 공지사항 조회
    @Transactional(readOnly = true)
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    // 특정 공지사항 조회
    @Transactional(readOnly = true)
    public Notice getNoticeById(Integer id) {
        return noticeRepository.findById(id)
                               .orElseThrow(() -> new RuntimeException("해당 ID의 공지사항을 찾을 수 없습니다."));
    }

    // 공지사항 수정
    @Transactional
    public Notice updateNotice(Integer id, Notice updatedNotice, List<Attachment> attachments) {
        Notice existingNotice = getNoticeById(id);
        // 엔티티 수정 로직 생략
        attachmentService.updateAttachmentsForNotice(existingNotice.getId(), attachments);
        existingNotice.setAttachments(attachments);
        return existingNotice;
    }

    // 공지사항 삭제
    @Transactional
    public void deleteNotice(Integer id) {
        Notice existingNotice = getNoticeById(id);
        attachmentService.deleteAttachmentsForNotice(existingNotice.getId());
        noticeRepository.delete(existingNotice);
    }
}
