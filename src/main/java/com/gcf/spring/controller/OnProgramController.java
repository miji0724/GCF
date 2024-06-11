package com.gcf.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.service.OnProgramService;
import com.gcf.spring.service.TeacherService;

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

    @GetMapping
    public ResponseEntity<List<OnProgram>> getAllOnPrograms() {
        List<OnProgram> programs = onProgramService.getAllOnPrograms();
        return ResponseEntity.ok(programs);
    }
}
