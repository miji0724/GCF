package com.gcf.spring.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.dto.NoticeDto;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Notice;
import com.gcf.spring.util.GcsUtil;

@Service
public class AttachmentService {

    private static final String STORAGE_LOCATION = "uploads/"; // 파일이 저장될 경로

    @Autowired
    private GcsUtil gcsUtil;
    
    @Autowired
    private AdminNoticeService adminNoticeService;

    @Transactional
    public List<Attachment> getAttachmentToNoticeList(List<MultipartFile> files) {
        Notice notice = new Notice(); // 새로운 Notice 객체 생성

        // Attachment를 담을 리스트 생성
        List<Attachment> attachments = new ArrayList<>();

        // MultipartFile 목록을 반복하여 Attachment 생성
        for(MultipartFile file : files) {
            // 각 파일에 대한 Attachment 생성
            String uniqueFileName = gcsUtil.generateUniqueFileName(file);
            Attachment attachment = new Attachment();
            attachment.setFileName(uniqueFileName);
            attachment.setFilePath(STORAGE_LOCATION + uniqueFileName); // 파일 경로 설정
            attachment.setType("notice");
            // 생성된 Attachment를 리스트에 추가
            attachments.add(attachment);
        }
        
        return attachments;
    }

    @Transactional
    public void uploadAttachment(List<MultipartFile> files) throws IOException {
        // 파일 업로드 코드를 구현해야 합니다.
    }

    // 파일 크기 제한 확인 메서드
    public boolean checkFileSize(MultipartFile file, long maxSize) {
        return file.getSize() <= maxSize;
    }

    // 파일 유형 유효성 검사 메서드
    public boolean checkFileType(MultipartFile file, List<String> allowedTypes) {
        String contentType = file.getContentType();
        return contentType != null && allowedTypes.contains(contentType);
    }

    // 보안 검사 메서드 (선택적으로 추가)
    public boolean performSecurityCheck(MultipartFile file) {
        // 보안 검사 로직을 여기에 추가합니다.
        return true; // 보안 검사 통과 시 true 반환
    } 
//    public static NoticeDto NoticeEntitytoDto(Notice notice) {
//        NoticeDto dto = new NoticeDto();
//        dto.setId(notice.getId());
//        dto.setTitle(notice.getTitle());
//        dto.setContent(notice.getContent());
//        dto.setViews(notice.getViews());
//        dto.setAuthor(notice.getAuthor());
//        dto.setCreated_at(notice.getCreated_at());
//        // Attachment 관련 정보는 필요에 따라 추가할 수 있습니다.
//        return dto;
//    }
}
