package com.gcf.spring.dto;

import java.time.LocalDate;
import java.util.List;

import com.gcf.spring.entity.Teacher;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemTeachDto {
    private String id;
    private String name;
    private LocalDate birth;
    private String phone_number;
    private String tel_number;
    private String email;
    private String address;
    private String detail_address;
    private String affiliatedOrganization;
    private List<String> teacherCategory;
    private String snsAddress;
    private String career;
    private String careerStartYear;
    private String careerEndYear;
    private String licenseName;
    private String teachAbleCategory;
    private String teacherState;
    
    public static MemTeachDto createMemTeachDto(Teacher teacher) {
    	MemTeachDto dto = new MemTeachDto();
        dto.setId(teacher.getId());
        dto.setName(teacher.getMember().getName()); 
        dto.setBirth(teacher.getMember().getBirth());
        dto.setPhone_number(teacher.getMember().getPhone_number());
        dto.setTel_number(teacher.getMember().getTelNumber());
        dto.setEmail(teacher.getMember().getEmail()); 
        dto.setAddress(teacher.getMember().getAddress());
        dto.setDetail_address(teacher.getMember().getDetail_address());
        dto.setAffiliatedOrganization(teacher.getAffiliatedOrganization());
        dto.setTeacherCategory(teacher.getTeacher_category());
        dto.setSnsAddress(teacher.getSnsAddress());
        dto.setCareer(teacher.getCareer());
        dto.setCareerStartYear(teacher.getCareerStartYear());
        dto.setCareerEndYear(teacher.getCareerEndYear());
        dto.setLicenseName(teacher.getLicenseName());
        dto.setTeachAbleCategory(teacher.getTeachAbleCategory());
        return dto;
    }
    
    @Override
    public String toString() {
        return "디버깅 MemTeach{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", birth=" + birth +
                ", phone_number='" + phone_number + '\'' +
                ", tel_number='" + tel_number + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", detail_address='" + detail_address + '\'' +
                ", affiliatedOrganization='" + affiliatedOrganization + '\'' +
                ", teacherCategory='" + teacherCategory + '\'' +
                ", snsAddress='" + snsAddress + '\'' +
                ", career='" + career + '\'' +
                ", careerStartYear=" + careerStartYear +
                ", careerEndYear=" + careerEndYear +
                ", licenseName='" + licenseName + '\'' +
                ", teachAbleCategory='" + teachAbleCategory + '\'' +
                ", teacherState='" + teacherState + '\'' +
                '}';
    }
}