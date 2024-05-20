package com.gcf.spring.dto;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDto {
    
	@NotNull
	private Integer id;
	
	@NotBlank(message = "제목은 필수 입력 값입니다.")
	private String title;
	
    @NotBlank(message = "내용은 필수 입력 값입니다.")
    private String content;
    
    @NotNull
    private Integer views;
    
    @NotBlank
    private String author;
    
    @NotNull
    private Date created_at;
}