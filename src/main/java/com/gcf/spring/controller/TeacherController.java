package com.gcf.spring.controller;

import com.gcf.spring.dto.TeacherDto;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teacher")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    // 강사 신청
    @PostMapping("/apply")
    public ResponseEntity<Teacher> applyForTeacher(@RequestBody TeacherDto teacherDto) {
        try {
            Teacher teacher = teacherService.applyForTeacher(teacherDto);
            return new ResponseEntity<>(teacher, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
