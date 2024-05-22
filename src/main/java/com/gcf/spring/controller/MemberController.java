package com.gcf.spring.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.constant.Role;
import com.gcf.spring.dto.MemberDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberController {
		
	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder;
	
    @GetMapping("/checkId")
    public ResponseEntity<String> checkId(@RequestParam("id") String id) {
    	System.out.println("아이디 중복확인");
        return memberService.checkId(id);
    }
    
    @PostMapping("/signUp/ok")
    public ResponseEntity<String> signUp(@RequestBody MemberDto memberDto) {
        try {
            // 서비스의 회원가입 메서드를 호출
            ResponseEntity<String> response = memberService.signUp(memberDto, passwordEncoder);
            return response;
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("회원가입 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
//    @GetMapping("/create")
//    public ResponseEntity<String> test() {
//        Member member = new Member();
//        List<String> interests = new ArrayList<>();
//        interests.add("음악");
//        interests.add("미술");
//        
//        member.setId("test");
//        member.setName("홍길동");
//        member.setPassword(passwordEncoder.encode("1234"));
//        member.setBirth(LocalDate.of(2000, 01, 01));
//        member.setPhone_number("010-1234-1234");
//        member.setTel_number("042-123-1234");
//        member.setEmail("test@test.com");
//        member.setAddress("대전시 중구");
//        member.setDetail_address("산성동");
//        member.setInterests(interests);
//        member.setEmail_agreement(true);
//        member.setMessage_agreement(true);
//        member.setMail_agreement(true);
//        member.setMarried(true);
//        member.setHasChildren(true);
//        member.setRole(Role.USER);
//
//        memberService.signUp(member);
//        return ResponseEntity.ok("테스트 유저");
//    }
        
}