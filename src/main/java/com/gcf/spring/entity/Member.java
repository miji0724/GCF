package com.gcf.spring.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gcf.spring.constant.Role;
import com.gcf.spring.dto.MemberDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="member")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Member {
	@Id
	@Column(name="id")
	private String id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String password;
	
	@Column(nullable = false)
	private LocalDate birth;
	
	@Column(nullable = false)
	private String phone_number;
	
	private String tel_number;
	
	@Column(unique = true)
	private String email;
	
	@Column(nullable = false)
	private String address;
	
	private String detail_address;
	
	private List<String> interests;
	
	@Column(nullable = false)
	private Boolean email_agreement;
	
	@Column(nullable = false)
	private Boolean message_agreement;
	
	@Column(nullable = false)
	private Boolean mail_agreement;
	
	private Boolean married;
	
	private Boolean hasChildren;
	
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@OneToOne(mappedBy = "member")
    private Teacher teacher;
	
	//회원가입 날짜
    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdAt;
	
	@PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
	
	public static Member createMember(MemberDto memberDto, PasswordEncoder passwordEncoder){
		Member member = new Member();
		member.setId(memberDto.getId());
		member.setName(memberDto.getName());
        member.setPassword(passwordEncoder.encode(memberDto.getPassword()));
		member.setBirth(memberDto.getBirth());
		member.setPhone_number(memberDto.getPhone_number());
		member.setTel_number(memberDto.getTel_number());
		member.setEmail(memberDto.getEmail());
		member.setAddress(memberDto.getAddress());
		member.setDetail_address(memberDto.getDetail_address());
		member.setEmail_agreement(memberDto.getEmail_agreement());
		member.setMessage_agreement(memberDto.getMessage_agreement());
		member.setMail_agreement(memberDto.getMail_agreement());
		member.setInterests(memberDto.getInterests());
		member.setMarried(memberDto.getMarried());
		member.setHasChildren(memberDto.getHasChildren());
		member.setRole(Role.ADMIN);
		return member;
	}
}