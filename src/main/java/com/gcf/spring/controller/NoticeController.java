package com.gcf.spring.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.entity.Notice;
import com.gcf.spring.service.NoticeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping("/notices")
    public Page<Notice> getNotices(
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "8") int size,
        @RequestParam(name= "title", required = false) String title,
        @RequestParam(name= "content",required = false) String content,
        @RequestParam(name = "searchTerm", required = false) String searchTerm) {
        if (title != null && !title.isEmpty()) {
            return noticeService.getNoticesByTitle(page, size, title);
        } else if (content != null && !content.isEmpty()) {
            return noticeService.getNoticesByContent(page, size, content);
        } else if (searchTerm != null && !searchTerm.isEmpty()) {
        	return noticeService.getNoticesByTitleOrContent(page, size, searchTerm);
        } else {
            return noticeService.getNotices(page, size);
        }
    }
    
    @GetMapping("/notices/count")
    public ResponseEntity<Long> getTotalNoticeCount() {
        long count = noticeService.getTotalNoticeCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
    
    @GetMapping("/notices/{id}")
    public ResponseEntity<?> getNoticeById(@PathVariable("id") Integer id) {
        Optional<Notice> noticeOptional = noticeService.getNoticeById(id);
        if(noticeOptional.isPresent()) {
            Notice notice = noticeOptional.get();
            return ResponseEntity.ok(notice);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/notices/{id}/views")
    public ResponseEntity<Void> increaseNoticeViews(@PathVariable("id") Integer id) {
        noticeService.increaseNoticeViews(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("home/notices")
    public List<Notice> getHomeNotices() {
    	return noticeService.getHomeNotices();
    }
}