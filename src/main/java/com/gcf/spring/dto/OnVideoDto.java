package com.gcf.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OnVideoDto {

    private Integer id;
    private OnProgramDto onProgram;
    private String videoInfoIndex;
    private String videoInfoDetail;
    private AttachmentDto attachment;
}
