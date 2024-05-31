package com.gcf.spring.dto;

import com.gcf.spring.entity.Notice;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.OnProgram;

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
	
    private OffProgram offProgram; // 연관된 오프라인 프로그램
    private OnProgram onProgram; // 연관된 온라인 프로그램
}