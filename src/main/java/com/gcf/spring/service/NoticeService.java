package com.gcf.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.entity.Notice;
import com.gcf.spring.repository.NoticeRepository;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    // 1. 공지사항 생성(Create)
    @Transactional
    public Notice createNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    // 2. 모든 공지사항 조회(Read)
    @Transactional(readOnly = true)
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    // 3. 특정 공지사항 조회(Read)
    @Transactional(readOnly = true)
    public Notice getNoticeById(Integer id) {
        return noticeRepository.findById(id)
                               .orElseThrow(() -> new RuntimeException("해당 ID의 공지사항을 찾을 수 없습니다."));
    }

    // 4. 공지사항 수정(Update)
    @Transactional
    public Notice updateNotice(Integer id, Notice updatedNotice) {
        Notice existingNotice = getNoticeById(id);
        if (updatedNotice.getAuthor() != null) {
            existingNotice.setAuthor(updatedNotice.getAuthor());
        }
        if (updatedNotice.getCreated_at() != null) {
            existingNotice.setCreated_at(updatedNotice.getCreated_at());
        }
        existingNotice.setViews(updatedNotice.getViews());
        return noticeRepository.save(existingNotice);
    }

    // 5. 공지사항 삭제(Delete)
    @Transactional
    public void deleteNotice(Integer id) {
        Notice existingNotice = getNoticeById(id);
        noticeRepository.delete(existingNotice);
    }
}
