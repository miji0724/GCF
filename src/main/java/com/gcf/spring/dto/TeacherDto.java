package com.gcf.spring.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TeacherDto {
    private String id;
    private String affiliatedOrganization;
    private List<String> teacherCategory;
    private String snsAddress;
    private String career;
    private String careerStartYear;
    private String careerEndYear;
    private String licenseName;
    private String teachAbleCategory;
    private String teacherState;
    
	@Override
	public String toString() {
	    return "Teacher{" +
	            "id='" + id + '\'' +
	            ", affiliatedOrganization='" + affiliatedOrganization + '\'' +
	            ", teacherCategory='" + teacherCategory + '\'' +
	            ", snsAddress='" + snsAddress + '\'' +
	            ", career='" + career + '\'' +
	            ", careerStartYear=" + careerStartYear +
	            ", careerEndYear=" + careerEndYear +
	            ", licenseName='" + licenseName + '\'' +
	            '}';
	}
}