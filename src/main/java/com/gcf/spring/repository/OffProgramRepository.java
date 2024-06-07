package com.gcf.spring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gcf.spring.entity.OffProgram;

@Repository
public interface OffProgramRepository extends JpaRepository<OffProgram, Integer> {

    // 이름으로 프로그램 검색
    Page<OffProgram> findByOffProgramNameContaining(String offProgramName, Pageable pageable);

    // 상태, 장소 및 카테고리로 프로그램 검색
    Page<OffProgram> findByStateAndPlaceNameAndOfflineCategory(
        String state, String placeName, String category, Pageable pageable
    );
    
    // 상태로 프로그램 검색
    Page<OffProgram> findByState(String state, Pageable pageable);
    
    // 장소로 프로그램 검색
    Page<OffProgram> findByPlaceName(String placeName, Pageable pageable);

    // 카테고리로 프로그램 검색
    Page<OffProgram> findByOfflineCategory(String category, Pageable pageable);
    
    
}
