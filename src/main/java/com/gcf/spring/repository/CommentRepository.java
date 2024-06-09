package com.gcf.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gcf.spring.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
