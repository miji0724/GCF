package com.gcf.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.service.ProgramService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProgramController {

	@Autowired
	private ProgramService programService;

	// VV 관리자 페이지에서 사용하는 메서드 영역 VV //

	@GetMapping("/manage/getOnPrograms") // 승인된 온라인 강의들 불러오기
	public List<OnProgramDto> getOnPrograms() {
		return programService.getAllOnPrograms();
	}

	@GetMapping("/manage/getOffPrograms") // 승인된 오프라인 강의들 불러오기
	public List<OffProgramDto> getOffPrograms() {
		return programService.getAllOffPrograms();
	}

	@GetMapping("/manage/getPendingApprovalOnPrograms") // 승인 대기중인 온라인 강의들 불러오기
	public List<OnProgramDto> getPendingApprovalOnPrograms() {
		return programService.getAllPendingApprovalOnPrograms();
	}

	@GetMapping("/manage/getPendingApprovalOffPrograms") // 승인 대기중인 오프라인 강의들 불러오기
	public List<OffProgramDto> getPendingApprovalOffPrograms() {
		return programService.getAllPendingApprovalOffPrograms();
	}
	
	@GetMapping("/manage/getSearchOnPrograms")
	public List<OnProgramDto> getSearchOnPrograms(@RequestParam("searchType") String searchType, @RequestParam("searchTerm") String searchTerm) {
		System.out.println("searchType = " + searchType);
		System.out.println("searchTerm = " + searchTerm);
		return programService.getAllSearchOnPrograms(searchType, searchTerm);
	}

	@GetMapping("/manage/getSearchOffPrograms") 
	public List<OffProgramDto> getSearchOffPrograms(@RequestParam("searchType") String searchType, @RequestParam("searchTerm") String searchTerm) {

		return programService.getAllSearchOffPrograms(searchType, searchTerm);
	}
	
	@GetMapping("/manage/getSearchPendingApprovalOnPrograms") 
	public List<OnProgramDto> getSearchPendingApprovalOnPrograms(@RequestParam("searchType") String searchType, @RequestParam("searchTerm") String searchTerm) {
		System.out.println("searchType = " + searchType);
		System.out.println("searchTerm = " + searchTerm);
		return programService.getAllSearchPendingApprovalOnPrograms(searchType, searchTerm);
	}

	@GetMapping("/manage/getSearchPendingApprovalOffPrograms") 
	public List<OffProgramDto> getSearchPendingApprovalOffPrograms(@RequestParam("searchType") String searchType, @RequestParam("searchTerm") String searchTerm) {

		return programService.getAllSearchPendingApprovalOffPrograms(searchType, searchTerm);
	}

	@PutMapping("/manage/onProgramApproval")
	public ResponseEntity<String> updateOnProgramStateApproval(@RequestBody Integer id) {

		System.out.println(id);

		boolean success = programService.updateOnProgramStateApproval(id);

		if (success) {
			return new ResponseEntity<>("Program state updated successfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Failed to update Program state", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/manage/onProgramNotApproval")
	public ResponseEntity<String> updateOnProgramStateNotApproval(@RequestBody Integer id) {

		System.out.println(id);

		boolean success = programService.updateOnProgramStateNotApproval(id);

		if (success) {
			return new ResponseEntity<>("Program state updated successfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Failed to update Program state", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/manage/offProgramApproval")
	public ResponseEntity<String> updateOffProgramStateApproval(@RequestBody Integer id) {

		System.out.println(id);

		boolean success = programService.updateOffProgramStateApproval(id);

		if (success) {
			return new ResponseEntity<>("Program state updated successfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Failed to update Program state", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/manage/offProgramNotApproval")
	public ResponseEntity<String> updateOffProgramStateNotApproval(@RequestBody Integer id) {

		System.out.println(id);

		boolean success = programService.updateOffProgramStateNotApproval(id);

		if (success) {
			return new ResponseEntity<>("Program state updated successfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Failed to update Program state", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/manage/deleteOnProgram/{id}")
	public ResponseEntity<Void> deleteOnProgram(@PathVariable("id") Integer id) {
		programService.deleteOnProgramById(id);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/manage/deleteOffProgram/{id}")
	public ResponseEntity<Void> deleteOffProgram(@PathVariable("id") Integer id) {
		programService.deleteOffProgramById(id);
		return ResponseEntity.noContent().build();
	}
}
