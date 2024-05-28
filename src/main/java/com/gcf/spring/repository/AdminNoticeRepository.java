package com.gcf.spring.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Notice;

public interface AdminNoticeRepository extends JpaRepository<Notice, Long>{
	Optional<Notice> findById(Long id);
}
