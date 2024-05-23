//package com.gcf.spring;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.Mockito.mock;
//import static org.mockito.Mockito.when;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import com.gcf.spring.constant.Role;
//import com.gcf.spring.dto.MyPageAuthenticationRequest;
//import com.gcf.spring.entity.Member;
//import com.gcf.spring.repository.MemberRepository;
//import com.gcf.spring.service.MyPageAuthenticationService;
//
//public class MyPageMemberServiceTest {
//
//    @Test
//    public void testAuthenticateUser_validPassword() {
//        // Given
//        MemberRepository memberRepository = mock(MemberRepository.class);
//        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
//        MyPageAuthenticationService authenticationService = new MyPageAuthenticationService(memberRepository, passwordEncoder);
//        
//        String id = "test";
//        String password = "1234";
//        String encodedPassword = passwordEncoder.encode(password); // 비밀번호 암호화
//
//        Member member = new Member();
//        member.setId(id);
//        member.setPassword(encodedPassword); // 암호화된 비밀번호 설정
//        member.setRole(Role.USER);
//
//        when(memberRepository.findById(id)).thenReturn(java.util.Optional.of(member));
//        when(passwordEncoder.matches(password, encodedPassword)).thenReturn(true);
//
//        // When
//        boolean result = authenticationService.authenticate(new MyPageAuthenticationRequest(id, password));
//
//        // Then
//        assertEquals(true, result);
//    }
//
//    @Test
//    public void testAuthenticateUser_invalidPassword() {
//        // Given
//        MemberRepository memberRepository = mock(MemberRepository.class);
//        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
//        MyPageAuthenticationService authenticationService = new MyPageAuthenticationService(memberRepository, passwordEncoder);
//
//        String id = "test";
//        String password = "1234";
//        String encodedPassword = passwordEncoder.encode(password); // 비밀번호 암호화
//
//        Member member = new Member();
//        member.setId(id);
//        member.setPassword(encodedPassword); // 암호화된 비밀번호 설정
//        member.setRole(Role.USER);
//
//        when(memberRepository.findById(id)).thenReturn(java.util.Optional.of(member));
//        when(passwordEncoder.matches("wrongPassword", encodedPassword)).thenReturn(false);
//
//        // When
//        boolean result = authenticationService.authenticate(new MyPageAuthenticationRequest(id, "wrongPassword"));
//
//        // Then
//        assertEquals(false, result);
//    }
//}
