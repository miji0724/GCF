package com.gcf.spring.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OffProgramDto {

    private Integer offProgramNumber; //프로그램 넘버
    
    private String offProgramName; //프로그램제목
    private String offProgramDetailName;//프로그램 상세정보
    private String applicationInfo;
    
    private LocalDate applicationStartDate;
    private LocalDate applicationEndDate;
    
    private LocalDate operatingStartDay;
    private LocalDate operatingEndDay;
    
    private String participationFee;
    
    private LocalTime startTime;
    private LocalTime endTime;
    
    private Integer maxParticipants;
    private Integer currentParticipants;
    
    private String state;
    
    private String dayOfWeek;
    
    private Integer views;
    private Integer likesCount;
    
    private String offlineCategory;
    
    private String placeName;
    private String programType;
    private AttachmentDto poster;
    private List<ProgramInfoDto> programInfos;
    private List<TeacherInfoDto> teacherInfos;
    private TeacherDto teacher;
}
