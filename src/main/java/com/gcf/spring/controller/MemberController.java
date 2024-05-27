package com.gcf.spring.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.dto.MemberDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberController {
		
    private final MemberService memberService;
	
    @GetMapping("/checkId")
    public ResponseEntity<String> checkId(@RequestParam("id") String id) {
        System.out.println("아이디 중복확인");
        return memberService.checkId(id);
    }
    
    @PostMapping("/signUp/ok")
    public ResponseEntity<String> signUp(@RequestBody MemberDto memberDto) {
        try {
            // 서비스의 회원가입 메서드를 호출
            ResponseEntity<String> response = memberService.signUp(memberDto);
            return response;
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("이미 존재하는 회원입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/member/login")
    public ResponseEntity<Member> login(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        String inputId = request.get("id");
        String inputPassword = request.get("password");

        Member authenticatedMember = memberService.authenticate(inputId, inputPassword);
        if (authenticatedMember != null) {
            return ResponseEntity.ok(authenticatedMember); // 회원 인증 성공 시 회원 정보 반환
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 인증 실패 시 UNAUTHORIZED 반환
        }
    }
    
    @PostMapping("/member/findId")
    public ResponseEntity<String> findId(@RequestBody MemberDto memberDto) {
        try {
            String foundId = memberService.findId(memberDto);
            if (foundId != null) {
                return ResponseEntity.ok(foundId);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }

    @PostMapping("/member/authentication")
    public ResponseEntity<Member> authentication(@RequestBody Map<String, String> request) {
        String inputPassword = request.get("password");
        
        // 인증을 위해 현재 로그인한 사용자의 아이디를 얻어옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userId = userDetails.getUsername();

        Member authenticatedMember = memberService.authenticateByPassword(userId, inputPassword);
        if (authenticatedMember != null) {
            return ResponseEntity.ok(authenticatedMember); // 회원 인증 성공 시 회원 정보 반환
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 인증 실패 시 UNAUTHORIZED 반환
        }
    }
    
    @GetMapping("/member/info")
    public ResponseEntity<MemberDto> getMemberInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userId = userDetails.getUsername();
        
        MemberDto memberDto = memberService.getUserInfo(userId);
        if (memberDto != null) {
            return ResponseEntity.ok(memberDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
