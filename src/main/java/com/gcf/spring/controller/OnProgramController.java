package com.gcf.spring.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

		System.out.println("아이디:"+onProgramDto);
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
			@RequestParam("descriptions") List<String> descriptions, @RequestParam("id") Integer id) {
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
			@RequestParam("videoinfoindex") List<String> videoinfoindexes, @RequestParam("id") Integer id) {
		// files 리스트의 요소를 출력
		for (MultipartFile file : files) {
			System.out.println(file);
		}

		List<OnVideo> onVideos = new ArrayList<>();
		OnProgram onProgram = onProgramService.getOnProgramById(id);

		for (int i = 0; i < videoinfoindexes.size(); i++) {
			Attachment attachment = null; // 파일 업로드 전에 변수를 null로 초기화

			// 파일이 첨부되었는지 확인하고 처리
			if (files != null && !files.isEmpty() && i < files.size() && !files.get(i).isEmpty()) {
				attachment = attachmentService.uploadOnProgramFile(files.get(i));
			}

			OnVideo onVideo = new OnVideo();
			String videoinfodetail = videoinfodetails.get(i);
			onVideo.setAttachment(attachment); // null일 경우 그대로 null로 설정
			onVideo.setVideoInfoIndex(videoinfoindexes.get(i)); // 인덱스에 맞게 videoinfoindex 가져오기
			onVideo.setVideoInfoDetail(videoinfodetail);
			onVideo.setOnProgram(onProgram);
			onVideos.add(onVideo);
		}
		onProgramService.insertOnVideo(onVideos);
		onProgram.setVideos(onVideos);

		System.out.println(onProgram.toString());

		return ResponseEntity.ok(null);
	}
	
	 // 조회수 갱신
    @PatchMapping("/{id}/increment-views")
    public ResponseEntity<Void> incrementViews(@PathVariable("id") Integer id) {
        boolean updated = onProgramService.updateProgramStats(id, true, false);
        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // 좋아요 갱신
    @PatchMapping("/{id}/increment-likes")
    public ResponseEntity<Void> incrementLikes(@PathVariable("id") Integer id) {
        boolean updated = onProgramService.updateProgramStats(id, false, true);
        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // ID로 강의 조회 (DTO 반환)
    @GetMapping("/{id}")
    public ResponseEntity<OnProgramDto> getOnProgramById(@PathVariable("id") Integer id) {
        OnProgramDto onProgramDto = onProgramService.getProgramById(id).orElse(null);
        return ResponseEntity.ok(onProgramDto);
    }

    // 카테고리 필터링 및 페이지네이션
    @GetMapping("/filter")
    public ResponseEntity<Page<OnProgramDto>> getFilteredPrograms(
            @RequestParam("category") String category,
            @RequestParam("page") int page,
            @RequestParam("size") int size) {
        Page<OnProgramDto> onProgramDtos = onProgramService.getFilteredPrograms(category, page, size);
        return ResponseEntity.ok(onProgramDtos);
    }
}