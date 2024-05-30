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
        return memberService.checkId(id);
    }

    @PostMapping("/signUp/ok")
    public ResponseEntity<String> signUp(@RequestBody MemberDto memberDto) {
        try {
            return memberService.signUp(memberDto);
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
            httpRequest.getSession(true); // 세션을 생성하거나 기존 세션을 사용
            return ResponseEntity.ok(authenticatedMember);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
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
    public ResponseEntity<Member> authentication(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        String inputPassword = request.get("password");
        String userId = request.get("id");

        System.out.println("Authenticating user: " + userId + " with password: " + inputPassword);

        Member authenticatedMember = memberService.authenticateByPassword(userId, inputPassword);
        if (authenticatedMember != null) {
            return ResponseEntity.ok(authenticatedMember);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    private String getAuthenticatedUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else if (principal instanceof String) {
            return (String) principal;
        } else {
            return null;
        }
    }

    @GetMapping("/member/info")
    public ResponseEntity<MemberDto> getMemberInfo(HttpServletRequest request) {
        String userId = getAuthenticatedUserId();

        System.out.println("Authenticated user ID: " + userId);

        if (userId == null) {
            System.out.println("User is not authenticated.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        MemberDto memberDto = memberService.getUserInfo(userId);
        if (memberDto != null) {
            return ResponseEntity.ok(memberDto);
        } else {
            System.out.println("User information not found for ID: " + userId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
