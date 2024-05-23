package com.gcf.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gcf.spring.entity.Attachment;

public interface AttachmentRepository extends JpaRepository<Attachment, Integer> {
    void deleteAllByParentIdAndParentType(Integer parentId, String parentType);
}
