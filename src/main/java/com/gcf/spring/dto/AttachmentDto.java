package com.gcf.spring.dto;

import com.gcf.spring.entity.Notice;

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
	private Long id;

	@NotBlank
	private String original_name;
	
	@NotBlank
	private String file_name;

	@NotBlank
	private String file_path;

	private Notice noticeId;

	@NotBlank
	private String parent;
}
