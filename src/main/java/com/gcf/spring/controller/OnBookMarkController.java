package com.gcf.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.entity.OnBookMark;
import com.gcf.spring.repository.OnBookMarkRepository;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class OnBookMarkController {

    @Autowired
    private OnBookMarkRepository onBookMarkRepository;

    @GetMapping("/onBookMarks")
    public List<OnBookMark> getOnBookMarks(HttpServletRequest request) {
        String userId = (String) request.getSession().getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("User not authenticated");
        }
        return onBookMarkRepository.findByMemberId(userId);
    }
}