package com.gcf.spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherInfoDto {

    private Integer id;
    private String info;
    private OnProgramDto onProgram;
    private OffProgramDto offProgram;
}