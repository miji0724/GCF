package com.gcf.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.service.OffProgramService;
import com.gcf.spring.service.TeacherService;

@RestController
@RequestMapping("/api/offProgram")
public class OffProgramController {

    @Autowired
    private OffProgramService offProgramService;

    @Autowired
    private TeacherService teacherService;

    @PostMapping
    public ResponseEntity<OffProgram> createOffProgram(@RequestBody OffProgramDto offProgramDto) {
        Teacher teacher = teacherService.findById(offProgramDto.getTeacher().getId());
        OffProgram newOffProgram = offProgramService.createOffProgram(offProgramDto, teacher);
        return ResponseEntity.ok(newOffProgram);
    }

    @GetMapping
    public ResponseEntity<List<OffProgram>> getAllOffPrograms() {
        List<OffProgram> programs = offProgramService.getAllOffPrograms();
        return ResponseEntity.ok(programs);
    }
}