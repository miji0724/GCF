package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.constant.Place;
import com.gcf.spring.entity.Off_program;

@Repository
public interface Off_program_Repository extends JpaRepository<Off_program, Integer> {

    List<Off_program> findByOff_program_name(String off_program_name); // 이름 검색

    List<Off_program> findByStateAndPlaceNameAndOfflineCategory( //필터 기능
        ProgramState state, Place placeName, Off_Category category
    );
}
