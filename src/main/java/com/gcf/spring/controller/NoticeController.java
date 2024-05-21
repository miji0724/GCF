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

import com.gcf.spring.entity.Notice;
import com.gcf.spring.service.NoticeService;

@RestController
@RequestMapping("/notices")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @PostMapping ("/create")
    public ResponseEntity<Notice> createNotice(@RequestBody Notice notice) {
        Notice createdNotice = noticeService.createNotice(notice);
        return new ResponseEntity<>(createdNotice, HttpStatus.CREATED);
    }

    @GetMapping 
    public ResponseEntity<List<Notice>> getAllNotices() {
        List<Notice> notices = noticeService.getAllNotices();
        return new ResponseEntity<>(notices, HttpStatus.OK);
    }

    @GetMapping("/{id}") 
    public ResponseEntity<Notice> getNoticeById(@PathVariable Integer id) {
        Notice notice = noticeService.getNoticeById(id);
        return new ResponseEntity<>(notice, HttpStatus.OK);
    }

    @PutMapping("/{id}") 
    public ResponseEntity<Notice> updateNotice(@PathVariable Integer id, @RequestBody Notice updatedNotice) {
        Notice updated = noticeService.updateNotice(id, updatedNotice);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<Void> deleteNotice(@PathVariable Integer id) {
        noticeService.deleteNotice(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}