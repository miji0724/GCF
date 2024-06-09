package com.gcf.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gcf.spring.entity.TeacherInfo;

public interface TeacherInfoRepository extends JpaRepository<TeacherInfo, Integer>{

}