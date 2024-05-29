package com.gcf.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.entity.Notice;
import com.gcf.spring.repository.NoticeRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    
    // 공지사항 모두 가져오기
    public Page<Notice> getNotices(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return noticeRepository.findAllByOrderByCreatedAtDesc(pageable);
    }
    
    public List<Notice> getHomeNotices() {
        return noticeRepository.findAllByOrderByCreatedAtDesc();
    }

    // 공지사항의 총 갯수 가져오기
    public long getTotalNoticeCount() {
        return noticeRepository.count();
    }

    // 공지사항 아이디로 가져오기(상세페이지)
    public Optional<Notice> getNoticeById(Long id) {
        return noticeRepository.findById(id);
    }

    // 클릭 시 조회수 증가
    public void increaseNoticeViews(Long id) {
        Optional<Notice> optionalNotice = noticeRepository.findById(id);
        if (optionalNotice.isPresent()) {
            Notice notice = optionalNotice.get();
            notice.setViews(notice.getViews() + 1);
            noticeRepository.save(notice);
        } else {
            throw new IllegalArgumentException("Notice not found with id: " + id);
        }
    }
    
    // 제목으로 공지사항 검색
    public Page<Notice> getNoticesByTitle(int page, int size, String title) {
        Pageable pageable = PageRequest.of(page, size);
        if (title != null && !title.isEmpty()) {
            return noticeRepository.findByTitleContaining(title, pageable);
        } else {
            return noticeRepository.findAll(pageable);
        }
    }
    
    // 내용으로 공지사항 검색
    public Page<Notice> getNoticesByContent(int page, int size, String content) {
        Pageable pageable = PageRequest.of(page, size);
        if (content != null && !content.isEmpty()) {
            return noticeRepository.findByContentContaining(content, pageable);
        } else {
            return noticeRepository.findAll(pageable);
        }
    }
    
    public Page<Notice> getNoticesByTitleOrContent(int page, int size, String searchTerm) {
    	Pageable pageable = PageRequest.of(page, size);
        return noticeRepository.findByTitleContainingOrContentContaining(searchTerm, searchTerm, pageable);
    }
}