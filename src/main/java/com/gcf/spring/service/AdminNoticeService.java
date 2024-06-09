package com.gcf.spring.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.dto.NoticeDto;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Notice;
import com.gcf.spring.repository.AdminNoticeRepository;
import com.gcf.spring.repository.AttachmentRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AdminNoticeService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AttachmentService attachmentService;
    
    @Autowired
    private AdminNoticeRepository adminNoticeRepository;

    @Autowired
    private AttachmentRepository attachmentRepository;

    public Notice getNotice(Integer id) {
        return adminNoticeRepository.findById(id).orElseThrow(() -> 
        new EntityNotFoundException("Notice not found with id: " + id));
    }

    public List<Notice> getAllNotices() {
        return adminNoticeRepository.findAll();
    }

    @Transactional
    public Notice createNotice(NoticeDto noticeDto, List<MultipartFile> files) {
        Notice notice = convertToEntity(noticeDto);
        List<Attachment> attachments = handleAttachments(notice, files);
        notice.setAttachments(attachments);
        return adminNoticeRepository.save(notice);
    }

    @Transactional
    public Notice updateNotice(Integer id, NoticeDto noticeDto, List<MultipartFile> files) {
        // 기존 공지 가져오기
        Notice existingNotice = adminNoticeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Notice not found with id: " + id));
        
        attachmentRepository.deleteAllByNotice(existingNotice);
        
        // 공지 업데이트
        updateNoticeFields(existingNotice, noticeDto);
        List<Attachment> attachments = handleAttachments(existingNotice, files);
        existingNotice.setAttachments(attachments);
        
        //attachmentService.deleteUnlinkedFiles();
        
        return adminNoticeRepository.save(existingNotice);
    }
    
    private void updateNoticeFields(Notice notice, NoticeDto noticeDto) {
        // 공지의 필드 업데이트 (제목, 내용 등)
        notice.setTitle(noticeDto.getTitle());
        notice.setContent(noticeDto.getContent());
    }

    private List<Attachment> handleAttachments(Notice notice, List<MultipartFile> files) {
        List<Attachment> attachments = new ArrayList<>();
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                try {
                    Attachment attachment = attachmentService.uploadNoticeFile(file, notice);
                    if (attachment != null) {
                        attachments.add(attachment);
                    }
                } catch (Exception e) {
                    // 파일 업로드 중에 예외 발생 시 로그 기록
                    e.printStackTrace();
                }
            }
        }
        return attachments;
    }
    
    @Transactional
    public boolean deleteNotice(Integer id) {
    	 Optional<Notice> optionalNotice = adminNoticeRepository.findById(id);
    	    if (optionalNotice.isPresent()) {
    	        Notice notice = optionalNotice.get();
    	        List<Attachment> attachments = notice.getAttachments();
    	        adminNoticeRepository.deleteById(id);
    	        //attachmentService.deleteUnlinkedFiles();
    	        return true;
    	    } else {
    	        return false;
    	    }
    }

    public Notice convertToEntity(NoticeDto noticeDto) {
        return modelMapper.map(noticeDto, Notice.class);
    }

    public NoticeDto convertToDto(Notice notice) {
        return modelMapper.map(notice, NoticeDto.class);
    }
}