package com.gcf.spring;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.gcf.spring.constant.Role;
import com.gcf.spring.dto.MyPageAuthenticationRequest;
import com.gcf.spring.entity.Member;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.service.MemberService; // 수정

public class MyPageMemberServiceTest {

    @Test
    public void testAuthenticateUser_validPassword() {
        // Given
        MemberRepository memberRepository = mock(MemberRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        MemberService memberService = new MemberService(memberRepository, passwordEncoder); // 수정
        
        String id = "test";
        String password = "1234";
        String encodedPassword = passwordEncoder.encode(password);

        Member member = new Member();
        member.setId(id);
        member.setPassword(encodedPassword);
        member.setRole(Role.USER);

        when(memberRepository.findById(id)).thenReturn(java.util.Optional.of(member));
        when(passwordEncoder.matches(password, encodedPassword)).thenReturn(true);

        // When
        boolean result = memberService.authenticateUser(new MyPageAuthenticationRequest(id, password));

        // Then
        assertEquals(true, result);
    }

    @Test
    public void testAuthenticateUser_invalidPassword() {
        // Given
        MemberRepository memberRepository = mock(MemberRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        MemberService memberService = new MemberService(memberRepository, passwordEncoder); // 수정

        String id = "test";
        String password = "1234";
        String encodedPassword = passwordEncoder.encode(password);

        Member member = new Member();
        member.setId(id);
        member.setPassword(encodedPassword);
        member.setRole(Role.USER);

        when(memberRepository.findById(id)).thenReturn(java.util.Optional.of(member));
        when(passwordEncoder.matches(password, encodedPassword)).thenReturn(false);

        // When
        boolean result = memberService.authenticateUser(new MyPageAuthenticationRequest(id, password));

        // Then
        assertEquals(false, result);
    }
}
