package com.gcf.spring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.constant.Place;
import com.gcf.spring.entity.Off_program;

@Repository
public interface Off_program_Repository extends JpaRepository<Off_program, Integer> {

    // 이름으로 프로그램 검색
    Page<Off_program> findByOff_program_nameContaining(String off_program_name, Pageable pageable);

    // 상태, 장소 및 카테고리로 프로그램 검색
    Page<Off_program> findByStateAndPlaceNameAndOffline_category(
        ProgramState state, Place placeName, Off_Category category, Pageable pageable
    );
}
