package com.gcf.spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttachmentDto {

    private Integer id;
    private String originalName;
    private String fileName;
    private String filePath;
    private NoticeDto noticeId;
    private String parent;
    private OffProgramDto offProgramPoster;
    private OnProgramDto onProgramPoster;
    private ProgramInfoDto offProgramInfo;
    private ProgramInfoDto onProgramInfo;
    private TeacherInfoDto offProgramTeacherInfo;
    private TeacherInfoDto onProgramTeacherInfo;
}
