package com.gcf.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcf.spring.entity.MyPageOfflineState;
import com.gcf.spring.repository.MyPageOfflineStateRepository;

@Service
public class MyPageOfflineStateService {

    @Autowired
    private MyPageOfflineStateRepository myPageOfflineStateRepository;

    public List<MyPageOfflineState> getAllMyPageOfflineStates() {
        return myPageOfflineStateRepository.findAll();
    }

    // 다른 조회 메서드들도 필요에 따라 추가할 수 있습니다.
}

