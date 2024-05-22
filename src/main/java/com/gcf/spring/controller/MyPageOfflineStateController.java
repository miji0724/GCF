package com.gcf.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.entity.MyPageOfflineState;
import com.gcf.spring.service.MyPageOfflineStateService;

@RestController
@RequestMapping("/api")
public class MyPageOfflineStateController {

    @Autowired
    private MyPageOfflineStateService myPageOfflineStateService;

    @GetMapping("/offline-states")
    public List<MyPageOfflineState> getAllMyPageOfflineStates() {
        return myPageOfflineStateService.getAllMyPageOfflineStates();
    }
}

