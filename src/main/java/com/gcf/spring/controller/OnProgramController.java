package com.gcf.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.entity.ProgramInfo;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.service.OnProgramService;
import com.gcf.spring.service.TeacherService;

import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("/api/onProgram")
public class OnProgramController {

    @Autowired
    private OnProgramService onProgramService;

    @Autowired
    private TeacherService teacherService;

    @PostMapping
    public ResponseEntity<OnProgram> createOnProgram(@RequestBody OnProgramDto onProgramDto) {
        Teacher teacher = teacherService.findById(onProgramDto.getTeacher().getId());
        OnProgram createdOnProgram = onProgramService.createOnProgram(onProgramDto, teacher);
        return ResponseEntity.ok(createdOnProgram);
    }
    
    @PostMapping(value = "/info", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProgramInfo> createInfo(@RequestPart("files") List<MultipartFile> files) {
    	System.out.println(files.size());
    	// dto.getDescription().forEach(e -> System.out.println(e));
    	// dto.getFiles().forEach(e -> System.out.println(e.getOriginalFilename()));
    	// ProgramInfo programInfo = onProgramService.insertProgramInfo(info);
        return ResponseEntity.ok(null);
    }

    @GetMapping
    public ResponseEntity<List<OnProgram>> getAllOnPrograms() {
        List<OnProgram> programs = onProgramService.getAllOnPrograms();
        return ResponseEntity.ok(programs);
    }
    
    @Getter
    @Setter
    class testDto {
    	public List<MultipartFile> files;
    	public List<String> description;
    	
    }
}
