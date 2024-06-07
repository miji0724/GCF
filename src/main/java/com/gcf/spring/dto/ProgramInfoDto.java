package com.gcf.spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProgramInfoDto {

    private Integer id;
    private String info;
    private OnProgramDto onProgram;
    private OffProgramDto offProgram;
}
