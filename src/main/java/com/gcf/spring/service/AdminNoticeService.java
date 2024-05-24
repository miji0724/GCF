package com.gcf.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcf.spring.dto.NoticeDto;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Notice;
import com.gcf.spring.repository.AdminNoticeRepository;
import com.gcf.spring.util.GcsUtil;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Transactional
@AllArgsConstructor
@Service
public class AdminNoticeService {

	@Autowired
    private AdminNoticeRepository adminNoticeRepository;
	
	@Autowired
    private GcsUtil gcsUtil;

    public Notice getNotice(Integer id) {
        return adminNoticeRepository.findById(id).orElse(null);
    }

    public List<Notice> getAllNotices() {
        return adminNoticeRepository.findAll();
    }
    
    @Transactional
    public Notice createNotice(NoticeDto noticeDto) {
        Notice notice = mapDtoToEntity(noticeDto); // NoticeDto를 Notice 엔티티로 매핑
        List<Attachment> attachments = notice.getAttachments(); // Notice에 포함된 Attachments 가져오기
        
        // Attachments가 존재하면 각 Attachment를 저장하기
        if (attachments != null && !attachments.isEmpty()) {
            for (Attachment attachment : attachments) {
                attachment.setNotice_id(notice); 
            }
        }

        return adminNoticeRepository.save(notice); // Notice 저장
    }



    public Notice updateNotice(Integer id, NoticeDto noticeDto) {
        Notice existingNotice = getNotice(id);
        mapDtoToEntity(noticeDto, existingNotice);
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
    
    private Notice mapDtoToEntity(NoticeDto noticeDto) {
        return Notice.builder()
                .title(noticeDto.getTitle())
                .content(noticeDto.getContent())
                .views(noticeDto.getViews())
                .author(noticeDto.getAuthor())
                .created_at(noticeDto.getCreated_at())
                .build();
    }

    private void mapDtoToEntity(NoticeDto noticeDto, Notice notice) {
        notice.setTitle(noticeDto.getTitle());
        notice.setContent(noticeDto.getContent());
        notice.setViews(noticeDto.getViews());
        notice.setAuthor(noticeDto.getAuthor());
        notice.setCreated_at(noticeDto.getCreated_at());
    }
}
