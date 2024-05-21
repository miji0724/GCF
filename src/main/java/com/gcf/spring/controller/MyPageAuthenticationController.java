package com.gcf.spring.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.dto.MyPageAuthenticationRequest;
import com.gcf.spring.entity.Member;
import com.gcf.spring.repository.MemberRepository;

@RestController
public class MyPageAuthenticationController {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MyPageAuthenticationController(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/MyPageAuthenticate")
    public ResponseEntity<String> authenticate(@RequestBody MyPageAuthenticationRequest request) {
        // 아이디로 사용자를 조회합니다.
        Optional<Member> optionalMember = memberRepository.findById(request.getId());
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            // 입력된 비밀번호와 저장된 비밀번호를 비교합니다.
            if (passwordEncoder.matches(request.getPassword(), member.getPassword())) {
                return ResponseEntity.ok("인증 성공");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 실패: 비밀번호가 일치하지 않습니다.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 실패: 사용자가 존재하지 않습니다.");
        }
    }
}

