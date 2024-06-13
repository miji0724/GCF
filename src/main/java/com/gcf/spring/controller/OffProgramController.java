package com.gcf.spring.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.ProgramInfo;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.entity.TeacherInfo;
import com.gcf.spring.service.AttachmentService;
import com.gcf.spring.service.OffProgramService;
import com.gcf.spring.service.TeacherService;

@RestController
@RequestMapping("/api/offProgram")
public class OffProgramController {

    @Autowired
    private OffProgramService offProgramService;
    
    @Autowired
    private AttachmentService attachmentService;

    @Autowired
    private TeacherService teacherService;

    @PostMapping
	public ResponseEntity<OffProgram> createOffProgram(@RequestBody OffProgramDto offProgramDto) {

		Teacher teacher = teacherService.findById(offProgramDto.getTeacherId());
		OffProgram createdOffProgram = offProgramService.createOffProgram(offProgramDto, teacher);

		return ResponseEntity.ok(createdOffProgram);
	}

	@PostMapping("/poster")
	public ResponseEntity<Attachment> createPoster(@RequestParam("poster") MultipartFile poster) {

		if (poster.isEmpty()) {
			// 포스터가 비어 있는 경우 처리
			return ResponseEntity.badRequest().build();
		}
		Attachment attachment = attachmentService.uploadOffProgramFile(poster);
		Attachment saveAtt = offProgramService.insertPoster(attachment);
		System.out.println("a:" + saveAtt);
		return ResponseEntity.ok(saveAtt);
	}

	@PostMapping("/offprograminfo")
	public ResponseEntity<ProgramInfo> createInfo(@RequestParam("files") List<MultipartFile> files,
			@RequestParam("descriptions") List<String> descriptions, @RequestParam("id") Integer id) {
		int i = 0;
		List<ProgramInfo> programInfos = new ArrayList<>();
		OffProgram offProgram = offProgramService.getOffProgramById(id);
		for (String description : descriptions) {
			Attachment attachment = attachmentService.uploadOffProgramFile(files.get(i));
			ProgramInfo programInfo = new ProgramInfo();
			programInfo.setAttachment(attachment);
			programInfo.setDescription(description);
			programInfo.setOffProgram(offProgram);
			programInfos.add(programInfo);
			i++;
		}
		offProgramService.insertProgramInfo(programInfos);

		return ResponseEntity.ok(null);
	}

	@PostMapping("/offteacherinfo")
	public ResponseEntity<TeacherInfo> createTInfo(@RequestParam("files") List<MultipartFile> files,
			@RequestParam("descriptions") List<String> descriptions, @RequestParam("id") Integer id) {
		int i = 0;
		List<TeacherInfo> teacherInfos = new ArrayList<>();
		OffProgram offProgram = offProgramService.getOffProgramById(id);
		for (String description : descriptions) {
			Attachment attachment = attachmentService.uploadOffProgramFile(files.get(i));
			TeacherInfo teacherInfo = new TeacherInfo();
			teacherInfo.setAttachment(attachment);
			teacherInfo.setDescription(description);
			teacherInfo.setOffProgram(offProgram);
			teacherInfos.add(teacherInfo);
			i++;
		}
		offProgramService.insertTeacherInfo(teacherInfos);

		return ResponseEntity.ok(null);
	}
    @GetMapping
    public ResponseEntity<List<OffProgram>> getAllOffPrograms() {
        List<OffProgram> programs = offProgramService.getAllOffPrograms();
        return ResponseEntity.ok(programs);
    }
}
