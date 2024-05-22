package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gcf.spring.entity.Off_program;

public interface Off_program_Repository extends JpaRepository<Off_program, Integer> {
	List<Off_program> findByName (String off_program_name); //이름검색
    List<Off_program> findByState(String state); // 상태검색
    List<Off_program> findByPlace(String Place); // 장소검색
    List<Off_program> findByCategory(String Category); // 카테고리 검색
}
