package com.gcf.spring.dto;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.gcf.spring.entity.Member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
	@NotBlank(message="이름은 필수 입력 값입니다.")
	private String name;
	
	@NotBlank(message="아이디는 필수 입력 값입니다.")
	private String id;
	
	@NotBlank(message="비밀번호는 필수 입력 값입니다.")
	@Length(min=8, max=16, message="비밀번호는 8자 이상, 16자 이하로 입력해주세요.")
	private String password;
	
	@NotBlank(message="비밀번호 확인은 필수 입력 값입니다.")
	private String confirm_password;
	
	@NotBlank(message = "성별은 필수 입력 값입니다.")
    private String sex;
	
	@NotNull(message = "생년월일은 필수 입력 값입니다.")
	private LocalDate birth;
	
	@NotBlank(message = "휴대폰 번호는 필수 입력 값입니다.")
	private String phone_number;
	
	private String tel_number;
	
	@NotBlank(message="이메일은 필수 입력 값입니다.")
	@Email(message = "올바른 이메일 주소를 입력해주세요.")
	private String email;

	private String zipCode;
	
	@NotBlank(message = "주소는 필수 입력 값입니다.")
    private String address;
	
	private String detailAddress;
	
	@NotEmpty(message = "관심사는 최소한 하나 이상 선택해야 합니다.")
	private List<String> interest;
	
    @NotNull(message = "이메일 수신 동의는 필수 입력 값입니다.")
    private Boolean email_agreement;

    @NotNull(message = "문자 수신 동의는 필수 입력 값입니다.")
    private Boolean message_agreement;

    @NotNull(message = "우편 수신 동의는 필수 입력 값입니다.")
    private Boolean mail_agreement;

	@NotNull(message = "결혼 여부는 필수 입력 값입니다.")
    private Boolean married;
	
	@NotNull(message = "자녀 유무는 필수 입력 값입니다.")
    private Boolean hasChildren;
    
}
