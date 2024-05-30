package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gcf.spring.constant.On_Category;
import com.gcf.spring.entity.On_program;


@Repository
public interface On_programRepository extends JpaRepository<On_program, Integer> {
    // 이름으로 프로그램 검색
    List<On_program> findByOn_Program_nameContaining(String name);

    // 카테고리로 프로그램 검색
    List<On_program> findByOnlineCategory(On_Category category);

    Page<On_program> findByOnlineCategory(On_Category category, Pageable pageable);
    Page<On_program> findByOn_program_nameContaining(String name, Pageable pageable);
}
