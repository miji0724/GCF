package com.gcf.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gcf.spring.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer>{

}
