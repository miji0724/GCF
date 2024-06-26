package com.gcf.spring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.constant.TeacherState;
import com.gcf.spring.dto.MemTeachDto;
import com.gcf.spring.dto.TeacherDto;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.service.TeacherService;

import jakarta.servlet.http.HttpServletRequest;
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

	@GetMapping("/teacher/myinfo")
	public ResponseEntity<TeacherDto> getTeacherInfo(@RequestParam("userId") String userId) {
		try {
			TeacherDto teacherDto = teacherService.getTeacherInfo(userId);
			return ResponseEntity.ok(teacherDto);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}

	@PutMapping("/teacher/{id}")
	public ResponseEntity<String> updateTeacherInfo(@PathVariable("id") String id, @RequestBody TeacherDto teacherDto) {
		try {
			teacherService.updateTeacherInfo(id, teacherDto);
			return ResponseEntity.ok("정보가 업데이트되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("업데이트 중 오류가 발생했습니다: " + e.getMessage());
		}
	}

	@DeleteMapping("/teacher/{id}")
	public ResponseEntity<String> deleteTeacherInfo(@PathVariable("id") String id) {
		try {
			teacherService.deleteTeacherInfo(id);
			return ResponseEntity.ok("삭제가 완료되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("삭제 중 오류가 발생했습니다: " + e.getMessage());
		}
	}

	// VV 관리자 페이지에서 사용하는 메서드 영역 VV //

	@GetMapping("/manage/pendingTeachers")
	public ResponseEntity<List<MemTeachDto>> getTeachersWithPendingApproval() {
		List<MemTeachDto> teachers = teacherService.getTeachersWithPendingApproval();
		return ResponseEntity.ok(teachers);
	}

	@GetMapping("/manage/approvedTeachers")
	public ResponseEntity<List<MemTeachDto>> getTeachersWithApproved() {
		List<MemTeachDto> teachers = teacherService.getTeachersWithApproved();
		return ResponseEntity.ok(teachers);
	}

	@GetMapping("/manage/searchApprovedTeachers")
	public List<MemTeachDto> searchApprovedTeachers(@RequestParam("searchType") String searchType,
			@RequestParam("searchTerm") String searchTerm) {
		return teacherService.searchApprovedTeachers(searchType, searchTerm);
	}

	@GetMapping("/manage/searchPendingTeachers")
	public List<MemTeachDto> searchPendingTeachers(@RequestParam("searchType") String searchType,
			@RequestParam("searchTerm") String searchTerm) {
		return teacherService.searchPendingTeachers(searchType, searchTerm);
	}

	@PutMapping("/manage/teacherApproval")
	public ResponseEntity<String> updateTeacherStateApproval(@RequestBody String id) {

		System.out.println(id);

		boolean success = teacherService.updateTeacherStateApproval(id);

		if (success) {
			return new ResponseEntity<>("Teacher state updated successfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Failed to update teacher state", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/manage/teacherNotApproval/{id}")
	public ResponseEntity<String> deleteApprovalTeacherById(@PathVariable("id") String id) {
		try {
			teacherService.deleteTeacherById(id);
			return ResponseEntity.ok("삭제가 완료되었습니다.");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Exception occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/manage/confirmTeacherInfo")
	public Teacher confirmTeacherInfo(@RequestBody MemTeachDto memTeachDto) {
		System.out.println(memTeachDto.toString());
		return teacherService.saveTeacher(memTeachDto);
	}

	@GetMapping("/teacher/getTeacherApprovalState")
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

	@DeleteMapping("/manage/deleteTeacherInfo/{id}")
	public ResponseEntity<String> deleteTeacherInfoInManage(@PathVariable("id") String id) {
		try {
			teacherService.deleteTeacherInfo(id);
			return ResponseEntity.ok("삭제가 완료되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("삭제 중 오류가 발생했습니다: " + e.getMessage());
		}
	}

}