package com.gcf.spring.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {

    private Integer id;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private MemberDTO user;
    private OnProgramDTO onProgram;
}
