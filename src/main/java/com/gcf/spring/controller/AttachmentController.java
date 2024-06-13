package com.gcf.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.dto.AttachmentDto;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.service.AttachmentService;
import com.gcf.spring.service.OffProgramService;
import com.gcf.spring.service.OnProgramService;

@RestController
@RequestMapping("/api/attachments")
public class AttachmentController {

    @Autowired
    private AttachmentService attachmentService;

    @Autowired
    private OnProgramService onProgramService;

    @Autowired
    private OffProgramService offProgramService;

    @PostMapping("/upload/onProgram")
    public AttachmentDto uploadOnProgramFile(@RequestParam("file") MultipartFile file, @RequestParam("programId") String programId) {
        OnProgram onProgram = onProgramService.getOnProgramById(Integer.parseInt(programId));
        Attachment attachment = attachmentService.uploadOnProgramFile(file);
        if (attachment != null) {
            return new AttachmentDto(attachment.getId(), attachment.getOriginal_name(), attachment.getFile_name(), attachment.getFile_path(), null, "onProgram");
        }
        return null;
    }

    @PostMapping("/upload/offProgram")
    public AttachmentDto uploadOffProgramFile(@RequestParam("file") MultipartFile file, @RequestParam("programId") String programId) {
        OffProgram offProgram = offProgramService.getOffProgramById(Integer.parseInt(programId));
        Attachment attachment = attachmentService.uploadOffProgramFile(file);
        if (attachment != null) {
            return new AttachmentDto(attachment.getId(), attachment.getOriginal_name(), attachment.getFile_name(), attachment.getFile_path(), null, "offProgram");
        }
        return null;
    }
}