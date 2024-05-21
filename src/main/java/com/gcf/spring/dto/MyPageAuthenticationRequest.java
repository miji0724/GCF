package com.gcf.spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyPageAuthenticationRequest {
    private String id;
    private String password;

    public MyPageAuthenticationRequest() {
        // 기본 생성자
    }

    public MyPageAuthenticationRequest(String id, String password) {
        this.id = id;
        this.password = password;
    }
}
