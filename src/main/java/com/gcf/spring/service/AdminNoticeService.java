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

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AdminNoticeService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AdminNoticeRepository adminNoticeRepository;

    @Autowired
    private AttachmentService attachmentService;

    public Notice getNotice(Long id) {
        return adminNoticeRepository.findById(id).orElse(null);
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
    public Notice updateNotice(Long id, NoticeDto noticeDto, List<MultipartFile> files) {
        Notice existingNotice = getNotice(id);
        if (existingNotice != null) {
            existingNotice.setTitle(noticeDto.getTitle());
            existingNotice.setContent(noticeDto.getContent());
            
            // 기존 첨부 파일 중에서 삭제할 것들을 미리 삭제
            List<Attachment> existingAttachments = existingNotice.getAttachments();
            List<Attachment> attachmentsToDelete = new ArrayList<>();
            if (files != null) { // files 리스트가 null이 아닌 경우에만 처리
                for (Attachment attachment : existingAttachments) {
                    if (!files.stream().anyMatch(file -> file.getOriginalFilename().equals(attachment.getOriginal_name()))) {
                        attachmentService.deleteFile(attachment);
                        attachmentsToDelete.add(attachment);
                    }
                }
            }
            existingAttachments.removeAll(attachmentsToDelete);
            
            // 새로운 첨부 파일을 추가하지 않고, 기존 첨부 파일만 유지
            List<Attachment> addAttachments = handleAttachments(existingNotice, files);
            existingNotice.getAttachments().addAll(addAttachments);
            
            return adminNoticeRepository.save(existingNotice);
        } else {
            return null;
        }
    }

    @Transactional
    public boolean deleteNotice(Long id) {
        Optional<Notice> optionalNotice = adminNoticeRepository.findById(id);
        if (optionalNotice.isPresent()) {
            adminNoticeRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    private List<Attachment> handleAttachments(Notice notice, List<MultipartFile> files) {
        List<Attachment> attachments = new ArrayList<>();
        if (files != null) {
            for (MultipartFile file : files) {
                try {
                    Attachment attachment = attachmentService.uploadNoticeFile(file, notice);
                    if (attachment != null) {
                        attachments.add(attachment);
                    }
                } catch (Exception e) {
                    // 파일 업로드 중에 예외 발생 시 처리
                    e.printStackTrace();
                    // 예외 발생 시 첨부 파일 리스트 초기화
                    attachments.clear();
                    break;
                }
            }
        }
        return attachments;
    }

    public Notice convertToEntity(NoticeDto noticeDto) {
        return modelMapper.map(noticeDto, Notice.class);
    }

    public NoticeDto convertToDto(Notice notice) {
        return modelMapper.map(notice, NoticeDto.class);
    }
}
