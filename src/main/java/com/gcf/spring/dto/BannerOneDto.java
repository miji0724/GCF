package com.gcf.spring.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotNull;
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
public class BannerOneDto {
	
	@NotNull
	private Long id;
	
	@NotNull
	private String url;
	
	private MultipartFile attachment;
}
