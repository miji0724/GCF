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

import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.entity.OnVideo;
import com.gcf.spring.entity.ProgramInfo;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.entity.TeacherInfo;
import com.gcf.spring.service.AttachmentService;
import com.gcf.spring.service.OnProgramService;
import com.gcf.spring.service.TeacherService;

@RestController
@RequestMapping("/api/onProgram")
public class OnProgramController {

    @Autowired
    private OnProgramService onProgramService;

    @Autowired
    private AttachmentService attachmentService;

    @Autowired
    private TeacherService teacherService;

	@PostMapping
	public ResponseEntity<OnProgram> createOnProgram(@RequestBody OnProgramDto onProgramDto) {

		Teacher teacher = teacherService.findById(onProgramDto.getTeacherId());
		OnProgram createdOnProgram = onProgramService.createOnProgram(onProgramDto, teacher);

		return ResponseEntity.ok(createdOnProgram);
	}
    
	@PostMapping("/poster")
	public ResponseEntity<Attachment> createPoster(@RequestParam("poster") MultipartFile poster) {

		System.out.println("Poster Information:");
		System.out.println("Name: " + poster.getOriginalFilename());
		System.out.println("Content Type: " + poster.getContentType());
		System.out.println("Size: " + poster.getSize() + " bytes");

		if (poster.isEmpty()) {
			// 포스터가 비어 있는 경우 처리
			return ResponseEntity.badRequest().build();
		}
		Attachment attachment = attachmentService.uploadOnProgramFile(poster);
		Attachment saveAtt = onProgramService.insertPoster(attachment);
		System.out.println("a:" + saveAtt);
		return ResponseEntity.ok(saveAtt);
	}

	@PostMapping("/onprograminfo")
	public ResponseEntity<ProgramInfo> createInfo(@RequestParam("files") List<MultipartFile> files,
			@RequestParam("descriptions") List<String> descriptions, @RequestParam("id") Integer id) {
		int i = 0;
		List<ProgramInfo> programInfos = new ArrayList<>();
		OnProgram onProgram = onProgramService.getOnProgramById(id);
		System.out.println("Program , onProgram : " + onProgram);
		for (String description : descriptions) {
			Attachment attachment = attachmentService.uploadOnProgramFile(files.get(i));
			ProgramInfo programInfo = new ProgramInfo();
			programInfo.setAttachment(attachment);
			programInfo.setDescription(description);
			programInfo.setOnProgram(onProgram);
			programInfos.add(programInfo);
			i++;
		}
		onProgramService.insertProgramInfo(programInfos);
		onProgram.setProgramInfos(programInfos);

		return ResponseEntity.ok(null);
	}
	
    @PostMapping("/onteacherinfo")
    public ResponseEntity<TeacherInfo> createTInfo(@RequestParam("files") List<MultipartFile> files,
            									   @RequestParam("descriptions") List<String> descriptions,
            									   @RequestParam("id") Integer id) {
    	int i = 0;
        List<TeacherInfo> teacherInfos = new ArrayList<>();
        OnProgram onProgram = onProgramService.getOnProgramById(id);
        for (String description : descriptions) {
            Attachment attachment = attachmentService.uploadOnProgramFile(files.get(i));
            TeacherInfo teacherInfo = new TeacherInfo();
            teacherInfo.setAttachment(attachment);
            teacherInfo.setDescription(description);
            teacherInfo.setOnProgram(onProgram);
            teacherInfos.add(teacherInfo);
            i++;
        }
        onProgramService.insertTeacherInfo(teacherInfos);

        return ResponseEntity.ok(null);	
    }
    
    @PostMapping("/onvideo")
    public ResponseEntity<OnVideo> createVInfo(@RequestParam("files") List<MultipartFile> files,
                                               @RequestParam("videoinfodetails") List<String> videoinfodetails,
                                               @RequestParam("videoInfoIndex") List<String> videoInfoIndex,
                                               @RequestParam("id") Integer id) {
        List<OnVideo> onVideos = new ArrayList<>();
        OnProgram onProgram = onProgramService.getOnProgramById(id);

        for (int i = 0; i < videoinfodetails.size(); i++) {
            String videoinfodetail = videoinfodetails.get(i);
            String index = videoInfoIndex.get(i); // 인덱스 값 받기

            Attachment attachment = attachmentService.uploadOnProgramFile(files.get(i));
            OnVideo onVideo = new OnVideo();
            onVideo.setAttachment(attachment);
            onVideo.setVideoInfoDetail(videoinfodetail);
            onVideo.setVideoInfoIndex(index.toString()); // 인덱스를 String으로 변환하여 설정
            onVideo.setOnProgram(onProgram);
            onVideos.add(onVideo);
        }

        onProgramService.insertOnVideo(onVideos);

        return ResponseEntity.ok(null);	
    }
    
    @GetMapping
    public ResponseEntity<List<OnProgram>> getAllOnPrograms() {
        List<OnProgram> programs = onProgramService.getAllOnPrograms();
        return ResponseEntity.ok(programs);
    }
 }