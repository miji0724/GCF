package com.gcf.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.entity.OffBookMark;
import com.gcf.spring.repository.OffBookMarkRepository;

@RestController
public class OffBookMarkController {

    @Autowired
    private OffBookMarkRepository offBookMarkRepository;

    @GetMapping("/api/offBookMarks")
    public List<OffBookMark> getOffBookMarks() {
        return offBookMarkRepository.findAll();
    }
}
