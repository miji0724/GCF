package com.gcf.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gcf.spring.entity.MyPageOfflineState;

public interface MyPageOfflineStateRepository extends JpaRepository<MyPageOfflineState, Long> {
    // 추가적인 메서드가 필요하다면 여기에 작성합니다.
}
