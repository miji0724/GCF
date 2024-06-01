package com.gcf.spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileDTO {
    private Long id;
    private String fileName;
    private String filePath;
    private String fileType;
    private Long offProgramId;
    private Long onProgramId;
}
