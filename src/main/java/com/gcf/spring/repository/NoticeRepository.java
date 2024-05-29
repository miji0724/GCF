package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gcf.spring.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    @Query("SELECT n FROM Notice n ORDER BY n.createdAt DESC")
    Page<Notice> findAllByOrderByCreatedAtDesc(Pageable pageable);
    
    List<Notice> findAllByOrderByCreatedAtDesc();
    
    // 제목 또는 내용에 검색어를 포함하는 공지사항(전체검색)
    Page<Notice> findByTitleContainingOrContentContaining(String title, String content, Pageable pageable);

    // 제목에 검색어를 포함하는 공지사항
    Page<Notice> findByTitleContaining(String title, Pageable pageable);
    
    // 내용에 검색어를 포함하는 공지사항
    Page<Notice> findByContentContaining(String content, Pageable pageable);

    long countByTitleContaining(String title);
}