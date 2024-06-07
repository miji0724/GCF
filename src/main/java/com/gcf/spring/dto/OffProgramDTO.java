package com.gcf.spring.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OffProgramDTO {

    private Integer offProgramNumber;
    private String offProgramName;
    private LocalDate operatingStartDay;
    private Integer views;
    private Integer likesCount;
    private String offlineCategory;
    private String programType;
    private AttachmentDTO poster;
    private List<ProgramInfoDTO> programInfos;
    private List<TeacherInfoDTO> teacherInfos;
    private TeacherDTO teacher;
    private List<CommentDTO> comments;
}
