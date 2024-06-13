package com.gcf.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.entity.OffBookMark;
import com.gcf.spring.repository.OffBookMarkRepository;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class OffBookMarkController {

    @Autowired
    private OffBookMarkRepository offBookMarkRepository;

    @GetMapping("/offBookMarks")
    public List<OffBookMark> getOffBookMarks(HttpServletRequest request) {
        String userId = (String) request.getSession().getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("User not authenticated");
        }
        return offBookMarkRepository.findByMemberId(userId);
    }
}