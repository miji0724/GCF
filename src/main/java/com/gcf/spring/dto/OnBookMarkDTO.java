package com.gcf.spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OnBookMarkDTO {

    private Integer id;
    private MemberDTO user;
    private OnProgramDTO onProgram;
}
