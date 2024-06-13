package com.gcf.spring.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
	private String name;
	
	private String id;
	
	@Length(min=8, max=16, message="비밀번호는 8자 이상, 16자 이하로 입력해주세요.")
	private String password;
	
	private String confirm_password;
	
	private LocalDate birth;
	
	private String phone_number;
	
	private String telNumber;
	
    private String address;
	
	private String detail_address;
	
	private String email1;
	
	private String email2;

	private String email;
	
    private Boolean email_agreement;

    private Boolean message_agreement;

    private Boolean mail_agreement;
    
	private List<String> interests;

    private Boolean married;
	
    private Boolean hasChildren;
    
    private String zonecode;
    
	@NotNull
	private LocalDateTime createdAt;
}
