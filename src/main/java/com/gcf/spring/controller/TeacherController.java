package com.gcf.spring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.dto.MemTeachDto;
import com.gcf.spring.dto.TeacherDto;
import com.gcf.spring.service.TeacherService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TeacherController {

	private final TeacherService teacherService;

	@PostMapping("/teacher/apply")
	public ResponseEntity<String> applyForTeacher(@RequestBody TeacherDto teacherDto) {
		try {
			teacherService.applyForTeacher(teacherDto);
			return ResponseEntity.ok("신청이 완료되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("신청 중 오류가 발생했습니다: " + e.getMessage());
		}
	}

	// VV 관리자 페이지에서 사용하는 메서드 영역 VV //

	@GetMapping("/manage/pendingApproval")
	public ResponseEntity<List<MemTeachDto>> getTeachersWithPendingApproval() {
		List<MemTeachDto> teachers = teacherService.getTeachersWithPendingApproval();
		return ResponseEntity.ok(teachers);
	}
	
	@PutMapping("/manage/teacherApproval")
    public ResponseEntity<String> updateTeacherState(@RequestBody String id) {
        
		System.out.println(id);
		
        boolean success = teacherService.updateTeacherState(id);
        
        if (success) {
            return new ResponseEntity<>("Teacher state updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to update teacher state", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}