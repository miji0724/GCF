package com.gcf.spring.dto;


import java.util.List;

import com.gcf.spring.constant.Role;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherDTO {
    private String id;
    
    @NotEmpty(message = "강의 분야는 최소한 하나 이상 선택해야 합니다.")
    private List<String> teacherCategory;
    
	@NotNull(message = "주요 이력은 필수 입력 값입니다.")
    private String carrer;
	@NotNull(message = "주요 이력 시작일은 필수 입력 값입니다.")
    private String careerStartYear;
	@NotNull(message = "주요 이력 종료일은 필수 입력 값입니다.")
    private String careerEndYear;
	
    private Role role;
        
    private String affiliatedOrganization;
    private String licenseName;
}
