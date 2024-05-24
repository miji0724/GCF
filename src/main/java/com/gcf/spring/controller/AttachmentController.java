package com.gcf.spring.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.service.AttachmentService;
import com.gcf.spring.service.AdminNoticeService;

@RestController
@RequestMapping("/attachments")
public class AttachmentController {

	@Autowired
	private AttachmentService attachmentService;

//	@Autowired
//	private AdminNoticeService noticeService;
	
	@PostMapping
	public ResponseEntity<Void> noticeUploadAttachments(@RequestParam("files") List<MultipartFile> files) {
		try {
			if (files.isEmpty() || (files.size() == 1 && files.get(0).isEmpty())) {
				System.out.println("No files uploaded.");
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			}
			for (MultipartFile file : files) {
				String fileName = file.getOriginalFilename();
				System.out.println("File Name: " + fileName); // 디버깅용
			}
			attachmentService.getAttachmentToNoticeList(files);
			attachmentService.uploadAttachment(files);
			return ResponseEntity.status(HttpStatus.CREATED).build();
		} catch (IOException e) {
			e.printStackTrace(); // 예외 정보를 콘솔에 출력하거나, 로깅 등의 작업을 수행합니다.
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
