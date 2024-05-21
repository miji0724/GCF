package com.gcf.spring.service;

import com.gcf.spring.dto.MyPageAuthenticationRequest;
import com.gcf.spring.entity.Member;
import com.gcf.spring.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyPageAuthenticationService {

    private final MemberRepository memberRepository;

    @Autowired
    public MyPageAuthenticationService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public boolean authenticate(MyPageAuthenticationRequest authenticationRequest) {
        String id = authenticationRequest.getId();
        String password = authenticationRequest.getPassword();

        Optional<Member> optionalMember = memberRepository.findById(id);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            return member.getPassword().equals(password);
        }

        return false;
    }
}
