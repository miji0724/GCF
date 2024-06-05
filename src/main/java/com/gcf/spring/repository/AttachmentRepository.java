package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Notice;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
	List<Attachment> findAllById(Iterable<Long> ids);
	List<Attachment> findAllByNoticeId(Notice notice);
	void deleteAllByNoticeId(Notice notice);
}
