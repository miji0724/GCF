package com.gcf.spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProgramInfoDTO {

    private Integer id;
    private String info;
    private OnProgramDTO onProgram;
    private OffProgramDTO offProgram;
}
