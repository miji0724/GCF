package com.gcf.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcf.spring.dto.CommentDto;
import com.gcf.spring.entity.Comment;
import com.gcf.spring.repository.CommentRepository;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // 모든 댓글을 가져오는 메서드
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    // 특정 ID의 댓글을 가져오는 메서드
    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    // 새로운 댓글을 생성하는 메서드
    public Comment createComment(CommentDto commentDto) {
        Comment comment = new Comment();
        comment.setContent(commentDto.getContent());
        return commentRepository.save(comment);
    }

}
