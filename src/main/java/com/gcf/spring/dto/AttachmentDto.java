package com.gcf.spring.dto;

import com.gcf.spring.entity.Notice;

import jakarta.validation.constraints.NotBlank;
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
public class AttachmentDto {
	@NotNull
	private Integer id;

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