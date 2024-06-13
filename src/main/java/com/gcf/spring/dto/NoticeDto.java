package com.gcf.spring.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NoticeDto {
    
	public NoticeDto() {
        this.attachments = new ArrayList<>();
    }
	
	@NotNull
	private int id;
	
	@NotBlank
    private String author = "관리자";
	
	@NotBlank(message = "제목은 필수 입력 값입니다.")
	private String title;
	
    @NotBlank(message = "내용은 필수 입력 값입니다.")
    private String content;
    
    @NotNull
    private LocalDateTime createdAt;
    
    @NotNull
    private Integer views = 0;
    
    private List<MultipartFile> attachments;
}