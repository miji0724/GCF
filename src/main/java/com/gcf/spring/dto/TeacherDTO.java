package com.gcf.spring.dto;

import java.time.Year;

import com.gcf.spring.constant.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherDTO {
    private String id; // 교사 ID
    private String carrer; // 경력
    private Year career_start_year; // 경력 시작 연도
    
    private String affiliated_organization; // 소속 기관
    private String license_code; // 자격증 코드
    
    private Role role; // 등급 (Member에서 가져옴)
    private String name; // 이름 (Member에서 가져옴)
    private String phone_number; // 전화번호 (Member에서 가져옴)
}
