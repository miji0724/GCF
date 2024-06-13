package com.gcf.spring.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.constant.TeacherState;
import com.gcf.spring.dto.TeacherDto;
import com.gcf.spring.service.TeacherService;

import jakarta.servlet.http.HttpServletRequest;
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

    @GetMapping("/myinfo")
    public ResponseEntity<TeacherDto> getTeacherInfo(@RequestParam("userId") String userId) {
        try {
            TeacherDto teacherDto = teacherService.getTeacherInfo(userId);
            return ResponseEntity.ok(teacherDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<String> updateTeacherInfo(@PathVariable("id") String id, @RequestBody TeacherDto teacherDto) {
        try {
            teacherService.updateTeacherInfo(id, teacherDto);
            return ResponseEntity.ok("정보가 업데이트되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("업데이트 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTeacherInfo(@PathVariable("id") String id) {
        try {
            teacherService.deleteTeacherInfo(id);
            return ResponseEntity.ok("삭제가 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("삭제 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
    
    @GetMapping("/getTeacherApprovalState")
    public ResponseEntity<TeacherState> sendTeacherStatus(HttpServletRequest httpRequest) {
        String teacherId = (String) httpRequest.getSession().getAttribute("userId");

        if (teacherId != null) {
            TeacherState status = teacherService.getTeacherStatus(teacherId);
            if (status != null) {
                return ResponseEntity.ok(status);
            } else {
                // 처리할 수 없는 상황에 따른 예외 처리
                return ResponseEntity.notFound().build(); // 예시로 404 에러 반환
            }
        } else {
            // 세션에 userId가 없는 경우에 대한 예외 처리
            return ResponseEntity.badRequest().build(); // 예시로 400 에러 반환
        }
    }
}
