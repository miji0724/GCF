package com.gcf.spring.dto;

import java.util.List;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherDto {
    private String id;
    
    private String affiliatedOrganization; // 소속기관
    
    private List<String> teacherCategory; // 강의분야
    
    private String snsAddress; // SNS 주소
    
    @NotNull(message = "주요 이력은 필수 입력 값입니다.")
    private String career; // 주요 이력
    
    @NotNull(message = "주요 이력 시작일은 필수 입력 값입니다.")
    private String careerStartYear; // 주요 이력 시작일
    
    @NotNull(message = "주요 이력 종료일은 필수 입력 값입니다.")
    private String careerEndYear; // 주요 이력 종료일
    
    private String licenseName; // 자격증 및 면허
}
