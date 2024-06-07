package com.gcf.spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OffBookMarkDTO {

    private Integer id;
    private MemberDTO user;
    private OffProgramDTO offProgram;
}
