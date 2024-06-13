package com.gcf.spring.controller;

import com.gcf.spring.entity.OnBookMark;
import com.gcf.spring.repository.OnBookMarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OnBookMarkController {

    @Autowired
    private OnBookMarkRepository onBookMarkRepository;

    @GetMapping("/onBookMarks")
    public List<OnBookMark> getAllOnBookMarks() {
        return onBookMarkRepository.findAll();
    }
}
