package com.gcf.spring.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.dto.NoticeDto;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Notice;
import com.gcf.spring.repository.AdminNoticeRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Transactional
@AllArgsConstructor
@Service
public class AdminNoticeService {

	@Autowired
	private AdminNoticeRepository adminNoticeRepository;

	@Autowired
	private AttachmentService attachmentService;

	public Notice getNotice(Integer id) {
		return adminNoticeRepository.findById(id).orElse(null);
	}

	public List<Notice> getAllNotices() {
		return adminNoticeRepository.findAll();
	}

	public Notice createNoticeWithAttachments(NoticeDto noticeDto, List<MultipartFile> files) {
	    Notice notice = Notice.createNotice(noticeDto);
	    
	    // files가 null이면 빈 리스트로 초기화
	    if (files == null) {
	        files = new ArrayList<>();
	    }

	    // 첨부파일 정보 변환 및 저장
	    List<Attachment> attachments = new ArrayList<>();
	    for (MultipartFile file : files) {
	        // 파일 업로드 및 첨부파일 정보 추가
	        Attachment attachment = attachmentService.uploadNoticeFile(file, notice);
	        if (attachment != null) {
	            attachments.add(attachment);
	        }
	    }
	    notice.setAttachments(attachments);

	    // 공지사항 저장
	    return adminNoticeRepository.save(notice);
	}

	public Notice updateNotice(Integer id, NoticeDto noticeDto) {
		Notice existingNotice = getNotice(id);
		return adminNoticeRepository.save(existingNotice);
	}

	public boolean deleteNotice(Integer id) {
		Optional<Notice> optionalNotice = adminNoticeRepository.findById(id);
		if (optionalNotice.isPresent()) {
			adminNoticeRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

}
