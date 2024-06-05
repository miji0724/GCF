package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Notice;

public interface AttachmentRepository extends JpaRepository<Attachment, Integer> {
	List<Attachment> findAllById(Iterable<Integer> ids);
	List<Attachment> findAllByNotice(Notice notice);
	void deleteAllByNotice(Notice notice);
	
}
