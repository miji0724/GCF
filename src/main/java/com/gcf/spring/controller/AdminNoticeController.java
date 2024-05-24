package com.gcf.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.dto.NoticeDto;
import com.gcf.spring.entity.Notice;
import com.gcf.spring.service.AdminNoticeService;

@RestController
@RequestMapping("/notices")
public class AdminNoticeController {

    private final AdminNoticeService adminNoticeService;

    @Autowired
    public AdminNoticeController(AdminNoticeService adminNoticeService) {
        this.adminNoticeService = adminNoticeService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notice> getNotice(@PathVariable("id") Integer id) {
        Notice notice = adminNoticeService.getNotice(id);
        if (notice != null) {
            return ResponseEntity.ok(notice);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public List<Notice> getAllNotices() {
        return adminNoticeService.getAllNotices();
    }

    @PostMapping
    public ResponseEntity<Notice> createNotice(@RequestBody NoticeDto noticeDto) {
        Notice createdNotice = adminNoticeService.createNotice(noticeDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNotice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notice> updateNotice(@PathVariable("id") Integer id, @RequestBody NoticeDto noticeDto) {
        Notice updatedNotice = adminNoticeService.updateNotice(id, noticeDto);
        if (updatedNotice != null) {
            return ResponseEntity.ok(updatedNotice);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotice(@PathVariable("id") Integer id) {
        boolean deleted = adminNoticeService.deleteNotice(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
