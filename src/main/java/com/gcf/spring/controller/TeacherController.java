package com.gcf.spring.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gcf.spring.dto.TeacherDto;
import com.gcf.spring.service.TeacherService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/teacher")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @PostMapping("/apply")
    public ResponseEntity<String> applyForTeacher(@RequestBody TeacherDto teacherDto) {
        try {
            teacherService.applyForTeacher(teacherDto);
            return ResponseEntity.ok("신청이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("신청 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}
