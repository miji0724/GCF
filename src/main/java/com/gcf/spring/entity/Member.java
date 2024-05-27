package com.gcf.spring.entity;

import java.sql.Date;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.gcf.spring.constant.Role;
import com.gcf.spring.dto.MemberDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "member")
@Getter
@Setter
public class Member {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private String id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String sex;

	@Column(nullable = false)
	private Date birth;

	@Column(nullable = false)
	private String phone_number;

	private String tel_number;

	@Column(unique = true)
	private String email;

	private String zipCode;

	@Column(nullable = false)
	private String address;

	private String detailAddress;

	@Column(nullable = false)
	private List<String> interest;

	@Column(nullable = false)
	private Boolean emailAgreement;

	@Column(nullable = false)
	private Boolean smsAgreement;

	@Column(nullable = false)
	private Boolean postalAgreement;

	private Boolean married;

	private Boolean hasChildren;

	@Enumerated(EnumType.STRING)
	private Role role;

	public static Member createMember(MemberDto memberDto, PasswordEncoder passwordEncoder) {
		Member member = new Member();
		member.setId(memberDto.getId());
		member.setName(memberDto.getName());
		String password = passwordEncoder.encode(memberDto.getPassword());
		member.setPassword(password);
		member.setSex(memberDto.getSex());
		member.setBirth(memberDto.getBirth());
		member.setPhone_number(memberDto.getPhone_number());
		member.setTel_number(memberDto.getTel_number());
		member.setEmail(memberDto.getEmail());
		member.setZipCode(memberDto.getZipCode());
		member.setAddress(memberDto.getAddress());
		member.setDetailAddress(memberDto.getDetailAddress());
		member.setInterest(memberDto.getInterest());
		member.setEmailAgreement(memberDto.getEmailAgreement());
		member.setSmsAgreement(memberDto.getSmsAgreement());
		member.setPostalAgreement(memberDto.getPostalAgreement());
		member.setMarried(memberDto.getMarried());
		member.setHasChildren(memberDto.getHasChildren());
		member.setRole(Role.USER);
		return member;
	}

}