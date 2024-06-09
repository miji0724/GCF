package com.gcf.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gcf.spring.entity.ProgramInfo;

public interface ProgramInfoRepository extends JpaRepository<ProgramInfo, Integer>{

}
