package com.gcf.spring.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter
@Setter
public class BannerOneDto {
	
	@NotNull
	private int id;
	
	@NotNull
	private String url;
	
	private MultipartFile attachment;
	
	@NotNull
	private String filePath;
	
    public BannerOneDto(int id, String url, MultipartFile attachment, String filePath) {
        this.id = id;
        this.url = url;
        this.attachment = attachment;
        this.filePath = filePath;
    }
}