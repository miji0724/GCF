package com.gcf.spring.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.gcf.spring.constant.Role;
import com.gcf.spring.entity.Member;
import com.gcf.spring.service.MemberService;

import jakarta.annotation.PostConstruct;

@Component
public class AdminAccountConfig {

    @Autowired
    private MemberService memberService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void createAdminAccount() {
        Member admin = new Member();
        admin.setId("manager12");
        admin.setName("Admin");
        admin.setPassword(passwordEncoder.encode("123123"));
        admin.setBirth(LocalDate.of(1980, 1, 1)); // 예시로 1980년 1월 1일로 설정
        admin.setPhone_number("010-1234-5678");
        admin.setTel_number("042-123-1234");
		admin.setEmail("admin@admin.com");
		admin.setAddress("대전시 중구");
		admin.setDetail_address("산성동");
		admin.setEmail_agreement(true);
		admin.setMessage_agreement(true);
		admin.setMail_agreement(true);
		admin.setMarried(true);
		admin.setHasChildren(true);
		admin.setCreatedAt(LocalDateTime.now());
		admin.setRole(Role.ADMIN);
		
		List<String> interests = new ArrayList<>();
		interests.add("음악");

		admin.setInterests(interests);

        memberService.signUp(admin);
    }
    
    @PostConstruct
    public void initializeAdminAccount() {
        createAdminAccount();
    }
}