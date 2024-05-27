package com.gcf.spring.dto;

import java.time.LocalDateTime;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttachmentDto {
	@NotNull
	private Integer id;

	@NotBlank
	private String file_name;

	@NotBlank
	private String file_path;

	private NoticeDto notice_id;  // 변경된 필드 이름

	@NotBlank
	private String type;
}
