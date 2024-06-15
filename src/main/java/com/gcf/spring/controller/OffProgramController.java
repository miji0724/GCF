package com.gcf.spring.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.ProgramInfo;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.entity.TeacherInfo;
import com.gcf.spring.service.AttachmentService;
import com.gcf.spring.service.OffProgramService;
import com.gcf.spring.service.TeacherService;

import jakarta.servlet.http.HttpServletRequest;

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

		System.out.println("createdOffProgram : " + createdOffProgram);
		
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
            									  @RequestParam("descriptions") List<String> descriptions,
            									  @RequestParam("id") Integer id) {
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
            									  @RequestParam("descriptions") List<String> descriptions,
            									  @RequestParam("id") Integer id) {
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

    @GetMapping("/myoffprogram")
    public ResponseEntity<List<OffProgram>> getOffProgramsByUserId(HttpServletRequest request) {
        String userId = (String) request.getSession().getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("User not authenticated");
        }
        List<OffProgram> programs = offProgramService.getOffProgramsByUserId(userId);
        System.out.println(userId);
        return ResponseEntity.ok(programs);
    } 
    
    private final ObjectMapper objectMapper; //지워도 상관 없음
    @Autowired
    public OffProgramController(OffProgramService offProgramService, ObjectMapper objectMapper) {
        this.offProgramService = offProgramService;
        this.objectMapper = objectMapper;
    } // 지워도 상관 없음
    
    
	// 조회수 갱신
	    @PatchMapping("/{id}/increment-views")
	    public ResponseEntity<Void> incrementViews(@PathVariable("id") Integer id) {
	        boolean updated = offProgramService.updateProgramStats(id, true, false);
	        if (updated) {
	            return ResponseEntity.ok().build();
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }
	    }
    
    // 좋아요 갱신
    @PatchMapping("/{id}/increment-likes")
    public ResponseEntity<Void> incrementLikes(@PathVariable("id") Integer id) {
        boolean updated = offProgramService.updateProgramStats(id, false, true);
        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    
    //경로 변수로 ID를 사용 
    @GetMapping("/{id}")
    public ResponseEntity<OffProgramDto> getOffProgramById(@PathVariable("id") Integer id) {
    	System.out.println(id);
        OffProgramDto offProgramDto = offProgramService.getProgramById(id).orElse(null);
        return ResponseEntity.ok(offProgramDto);
    }
    
    //경로 변수로 프로그램 이름을 사용 (상황 봐서 사용) 
    @GetMapping("/details/{programName}")
    public ResponseEntity<OffProgramDto> getProgramByName(@PathVariable String programName) {
        Optional<OffProgramDto> program = offProgramService.getProgramByName(programName);
        return program.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    
    //필터링 기능 구현 
    @GetMapping("/filter")
    public ResponseEntity<Page<OffProgramDto>> getFilteredPrograms(
            @RequestParam(value = "state", required = false) String state,
            @RequestParam(value = "placeName", required = false) String placeName,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "date", required = false) String date,
            @RequestParam("page") int page,
            @RequestParam("size") int size) {
        Page<OffProgramDto> offProgramDtos = offProgramService.getFilteredPrograms(state, placeName, category, date, page, size);
        return ResponseEntity.ok(offProgramDtos);
    }

    


    @PostMapping("/{id}/signup")
    public ResponseEntity<Void> signUpParticipant(@PathVariable("id") Integer id, @RequestBody Map<String, String> requestBody) {
        String userId = requestBody.get("userId");
        System.out.println("userId:" + userId);
        boolean updated = offProgramService.incrementParticipants(id, userId);

        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
}