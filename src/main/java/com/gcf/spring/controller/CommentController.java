package com.gcf.spring.controller;

import com.gcf.spring.entity.Comment;
import com.gcf.spring.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @GetMapping("/comments")
    public List<Comment> getAllComments(HttpServletRequest request) {
        String userId = (String) request.getSession().getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("User not authenticated");
        }
        return commentRepository.findByMemberId(userId);
    }
}
