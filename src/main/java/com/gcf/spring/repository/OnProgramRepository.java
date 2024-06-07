package com.gcf.spring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gcf.spring.entity.OnProgram;

@Repository
public interface OnProgramRepository extends JpaRepository<OnProgram, Integer> {

    // 카테고리로 프로그램 검색
    Page<OnProgram> findByOnlineCategoryContaining(String onlineCategory, Pageable pageable);

    // 이름으로 프로그램 검색
    Page<OnProgram> findByOnProgramNameContaining(String onProgramName, Pageable pageable);
}
