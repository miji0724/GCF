package com.gcf.spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OffBookMarkDto {

    private Integer id;
    private MemberDto user;
    private OffProgramDto offProgram;
}