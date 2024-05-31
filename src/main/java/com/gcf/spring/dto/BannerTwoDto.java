package com.gcf.spring.dto;

import com.gcf.spring.entity.Attachment;

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
public class BannerTwoDto {
	
	@NotNull
	private Long id;
	
	@NotNull
	private String url;
	
	private Attachment attachment;
}
