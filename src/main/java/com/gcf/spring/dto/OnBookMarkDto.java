package com.gcf.spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OnBookMarkDto {

    private Integer id;
    private MemberDto user;
    private OnProgramDto onProgram;
}
