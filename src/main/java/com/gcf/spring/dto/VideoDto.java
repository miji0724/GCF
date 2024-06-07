package com.gcf.spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VideoDto {

    private Integer id;
    private String title;
    private String url;
    private OnProgramDto onProgram;
}
