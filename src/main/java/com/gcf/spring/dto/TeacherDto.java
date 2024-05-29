package com.gcf.spring.dto;

import com.gcf.spring.constant.Teacher_category;
import com.gcf.spring.entity.Member;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherDto {
	
	@NotNull
    private Member member;
	
	private String affiliated_Organization;
    
	@NotNull(message = "강의 분야는 필수 입력 값입니다.")
    @NotEmpty(message = "강의 분야는 최소한 하나 이상 선택해야 합니다.")
    private Teacher_category teacher_category;
	
	private String sns_address;
    
	@NotNull(message = "주요 이력은 필수 입력 값입니다.")
    private String carrer;
	
	@NotNull(message = "주요 이력 시작일은 필수 입력 값입니다.")
    private String career_start_year;
	
	@NotNull(message = "주요 이력 종료일은 필수 입력 값입니다.")
    private String career_end_year;
    
    private String license;
    
    private String teach_able_field;
}