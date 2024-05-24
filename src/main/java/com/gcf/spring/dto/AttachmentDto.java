package com.gcf.spring.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

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
