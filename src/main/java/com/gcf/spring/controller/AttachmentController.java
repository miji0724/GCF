package com.gcf.spring.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.entity.Attachment;
import com.gcf.spring.service.AttachmentService;
import com.gcf.spring.service.GoogleCloudStorageService;

@RestController
@RequestMapping("/attachments")
public class AttachmentController {

    @Autowired
    private AttachmentService attachmentService;
    
    @Autowired
    private GoogleCloudStorageService googleCloudStorageService;

    @PostMapping("/{noticeId}")
    public ResponseEntity<Void> uploadAttachments(@PathVariable("noticeId") Integer noticeId, @RequestParam("attachments") MultipartFile[] attachmentFiles) {
        try {
            for (MultipartFile file : attachmentFiles) {
                Attachment attachment = new Attachment();
                String fileName = file.getOriginalFilename();
                attachment.setFileName(fileName);
                String fileUrl = googleCloudStorageService.uploadFile(file);
                attachment.setFilePath(fileUrl);
                attachment.setParentType("notice");
                // 공지사항 ID와 함께 첨부파일 저장 등의 처리
            }
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/{noticeId}")
    public ResponseEntity<Void> updateAttachmentsForNotice(@PathVariable("noticeId") Integer noticeId, @RequestBody List<Attachment> attachments) {
        attachmentService.updateAttachmentsForNotice(noticeId, attachments);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{noticeId}")
    public ResponseEntity<Void> deleteAttachmentsForNotice(@PathVariable("noticeId") Integer noticeId) {
        attachmentService.deleteAttachmentsForNotice(noticeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
