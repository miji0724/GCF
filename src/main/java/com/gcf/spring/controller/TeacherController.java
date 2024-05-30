package com.gcf.spring.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gcf.spring.dto.TeacherDTO;
import com.gcf.spring.service.TeacherService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/teachers")
public class TeacherController {

    private final TeacherService teacherService;
    
    

    @GetMapping
    public List<TeacherDTO> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherDTO> getTeacherById(@PathVariable String id) {
        Optional<TeacherDTO> teacher = teacherService.getTeacherById(id);
        return teacher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TeacherDTO> createTeacher(@RequestBody TeacherDTO teacherDTO) {
        TeacherDTO createdTeacher = teacherService.saveTeacher(teacherDTO);
        return ResponseEntity.ok(createdTeacher);
    }

    @PostMapping("/{id}/updateStats")
    public ResponseEntity<Void> updateTeacherStats(
            @PathVariable String id,
            @RequestParam(required = false) String carrer,
            @RequestParam(required = false) String careerStartYear,
            @RequestParam(required = false) String careerEndYear,
            @RequestParam(required = false) String affiliatedOrganization,
            @RequestParam(required = false) String licenseCode) {
        if (teacherService.updateTeacherStats(id, carrer, careerStartYear, careerEndYear, affiliatedOrganization, licenseCode)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
