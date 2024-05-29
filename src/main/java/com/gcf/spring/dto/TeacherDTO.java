package com.gcf.spring.dto;

import java.time.LocalDate;
import java.time.Year;

import com.gcf.spring.constant.Role;
import com.gcf.spring.constant.Teacher_category;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherDTO {
    private String id;
    
    @NotEmpty(message = "강의 분야는 최소한 하나 이상 선택해야 합니다.")
    private Teacher_category teacher_category;
    
	@NotNull(message = "주요 이력은 필수 입력 값입니다.")
    private String carrer;
	@NotNull(message = "주요 이력 시작일은 필수 입력 값입니다.")
    private String career_Start_Year;
	@NotNull(message = "주요 이력 종료일은 필수 입력 값입니다.")
    private String career_End_Year;
	
    private Role role;
        
    private String affiliated_Organization;
    private String license_name;
    private String memberId;
    private String name;
    private String phoneNumber;
    private String address;
    private String detailAddress;
    private String email;
    private LocalDate birthDay;
}
