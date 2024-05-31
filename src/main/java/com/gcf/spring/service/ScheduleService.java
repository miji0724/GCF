package com.gcf.spring.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.entity.Off_program;
import com.gcf.spring.repository.Off_program_Repository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ScheduleService {
	
	private final Off_program_Repository off_program_Repository;
	
	// 모든 오프라인 프로그램 모집 시작일 최신순으로 가져오기
    public List<Off_program> getOffPrograms() {
        return off_program_Repository.findAllByOrderByRecruitmentStartDate();
    }
    
    // 입력받은 날짜에 해당하는 프로그램 가져오기
    public List<Off_program> getProgramsByDate(LocalDate date) {
        return off_program_Repository.findProgramsByDate(date);
    }
}
