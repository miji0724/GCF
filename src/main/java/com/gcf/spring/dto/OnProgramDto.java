package com.gcf.spring.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OnProgramDto {

    private Integer onProgramNumber;
    private String onProgramName;
    private LocalDate operatingStartDay;
    private Integer views;
    private Integer likesCount;
    private String onlineCategory;
    private String programType;
    private AttachmentDto poster;
    private List<ProgramInfoDto> programInfos;
    private List<TeacherInfoDto> teacherInfos;
    private List<VideoDto> videos;
    private TeacherDto teacher;
    private List<CommentDto> comments;
}
