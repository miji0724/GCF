package com.gcf.spring.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.Place;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.entity.Off_program;

public interface Off_program_Repository extends JpaRepository<Off_program, Integer>{
	
    // 이름으로 프로그램 검색
    Page<Off_program> findByOffProgramNameContaining(String offProgramName, Pageable pageable);

    // 상태, 장소 및 카테고리로 프로그램 검색
    Page<Off_program> findByStateAndPlaceNameAndOfflineCategory(
        ProgramState state, Place placeName, Off_Category category, Pageable pageable
    );
    
    // 최신 날짜순으로 정렬 검색
    List<Off_program> findAllByOrderByRecruitmentStartDate();
    
    // 특정 날짜가 운영 시작일과 종료일 사이에 있는 프로그램 리스트 가져오기
    @Query("SELECT p FROM Off_program p WHERE :date BETWEEN p.operatingStartDay AND p.operatingEndDay")
    List<Off_program> findProgramsByDate(@Param("date") LocalDate date);
}
