package com.gcf.spring.service;

import com.gcf.spring.entity.Attachment;
import com.gcf.spring.repository.AttachmentRepository;
import com.gcf.spring.util.GcsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class AttachmentService {

    @Autowired
    private GcsUtil gcsUtil;

    @Autowired
    private AttachmentRepository attachmentRepository;

    public Attachment saveAttachment(MultipartFile file, String bucketName, int index) throws IOException {
        String fileName = gcsUtil.generateUniqueFileName(file, index);
        gcsUtil.uploadFile(bucketName, fileName, file);

        Attachment attachment = new Attachment();
        attachment.setOriginalName(file.getOriginalFilename());
        attachment.setFileName(fileName);
        attachment.setFilePath("gs://" + bucketName + "/" + fileName);
        attachment.setIndex(index);

        return attachmentRepository.save(attachment);
    }
}
