package com.gcf.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gcf.spring.dto.NoticeDto;
import com.gcf.spring.entity.Notice;
import com.gcf.spring.service.AdminNoticeService;

@RestController
@RequestMapping("/notices")
public class AdminNoticeController {

	@Autowired
	private AdminNoticeService adminNoticeService;

	@Autowired
	private ObjectMapper objectMapper;

	@GetMapping("/{id}")
	public ResponseEntity<String> getNotice(@PathVariable("id") Long id) {
		Notice notice = adminNoticeService.getNotice(id);
		if (notice != null) {
			try {
				// 객체를 JSON 문자열로 변환
				String jsonNotice = objectMapper.writeValueAsString(notice);
				return ResponseEntity.ok(jsonNotice);
			} catch (JsonProcessingException e) {
				// JSON 변환 중 에러가 발생하면 500 에러를 반환
				return ResponseEntity.status(500).body("Error converting notice to JSON");
			}
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping
	public List<Notice> getAllNotices() {
		return adminNoticeService.getAllNotices();
	}

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Notice> createNotice(@RequestPart("noticeDto") NoticeDto noticeDto,
			@RequestPart(value = "files", required = false) List<MultipartFile> files) {
		// NoticeDto와 첨부 파일을 함께 받아서 처리
		Notice createdNotice = adminNoticeService.createNotice(noticeDto, files);
		return ResponseEntity.ok(createdNotice);
	}

	@PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Notice> updateNotice(@PathVariable("id") Long id, @RequestPart("noticeDto") NoticeDto noticeDto,
			@RequestPart(value = "files", required = false) List<MultipartFile> files) {
		System.out.println("test");
		Notice updatedNotice = adminNoticeService.updateNotice(id, noticeDto, files);
		if (updatedNotice != null) {
			return ResponseEntity.ok(updatedNotice);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteNotice(@PathVariable("id") Long id) {
		boolean deleted = adminNoticeService.deleteNotice(id);
		if (deleted) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
