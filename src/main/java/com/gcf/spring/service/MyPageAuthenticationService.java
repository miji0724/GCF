package com.gcf.spring.service;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.gcf.spring.dto.MyPageAuthenticationRequest;
import com.gcf.spring.repository.MemberRepository;

public class MyPageAuthenticationService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MyPageAuthenticationService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean authenticate(MyPageAuthenticationRequest request) {
        return memberRepository.findById(request.getId())
                .map(member -> passwordEncoder.matches(request.getPassword(), member.getPassword()))
                .orElse(false);
    }
}
