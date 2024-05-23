package com.gcf.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.entity.Attachment;
import com.gcf.spring.repository.AttachmentRepository;

@Service
public class AttachmentService {

    @Autowired
    private AttachmentRepository attachmentRepository;

    @Transactional
    public void saveAttachmentsForNotice(Integer noticeId, List<Attachment> attachments) {
        for (Attachment attachment : attachments) {
            attachment.setParentId(noticeId);
            attachment.setParentType("notice");
            System.out.println(attachment.toString());
            attachmentRepository.save(attachment);
        }
    }

    @Transactional
    public void updateAttachmentsForNotice(Integer noticeId, List<Attachment> attachments) {
        deleteAttachmentsForNotice(noticeId);
        saveAttachmentsForNotice(noticeId, attachments);
    }

    @Transactional
    public void deleteAttachmentsForNotice(Integer noticeId) {
        attachmentRepository.deleteAllByParentIdAndParentType(noticeId, "notice");
    }
}
