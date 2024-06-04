package com.gcf.spring.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.dto.Off_programDto;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.repository.Off_program_repository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class Off_programService {

	private final Off_program_repository off_program_repository;
	
	public ResponseEntity<String> makeOffProgram(Off_programDto off_programDto) {
		OffProgram offProgram = OffProgram.createOffProgram(off_programDto);

        try {
            // 회원 정보를 데이터베이스에 저장
        	off_program_repository.save(offProgram);
            return ResponseEntity.status(HttpStatus.CREATED).body("오프라인 프로그램 만들기가 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오프라인 프로그램 만들기 중 오류가 발생했습니다");
        }
	}
	
	public ResponseEntity<String> makeOffProgram(OffProgram offProgram) {
        try {
            // 회원 정보를 데이터베이스에 저장
        	off_program_repository.save(offProgram);
            return ResponseEntity.status(HttpStatus.CREATED).body("오프라인 프로그램 만들기가 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오프라인 프로그램 만들기 중 오류가 발생했습니다");
        }
	}
			
}
