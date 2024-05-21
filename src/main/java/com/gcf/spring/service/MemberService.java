package com.gcf.spring.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.constant.Role;
import com.gcf.spring.dto.MemberDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {
    
    private final MemberRepository memberRepository;
    
    // 비밀번호 일치 확인
    public boolean isPasswordMatch(String password, String confirm_password) {
        return password.equals(confirm_password);
    }
    
    // 회원가입
    public ResponseEntity<String> signUp(MemberDto memberDto, PasswordEncoder passwordEncoder) {
        // 비밀번호 일치 여부 확인
        if (!isPasswordMatch(memberDto.getPassword(), memberDto.getConfirm_password())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 일치하지 않습니다.");
        }
        
        // 아이디 중복 체크
        if (existsById(memberDto.getId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 사용 중인 아이디입니다.");
        }

        Member member = Member.createMember(memberDto, passwordEncoder);
        member.setRole(Role.USER);

        try {
            // 회원 정보를 데이터베이스에 저장
            memberRepository.save(member);

            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 중 오류가 발생했습니다");
        }
    }
    
//    public void signUp(Member member) {
//        memberRepository.save(member);
//    }
    
    public boolean existsById(String id) {
        System.out.println("아이디 존재 확인");
        return memberRepository.existsById(id);
    }
    
    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findById(id);
        if (optionalMember.isEmpty()) {
            throw new UsernameNotFoundException(id);
        }
        Member member = optionalMember.get();
        return User.builder()
                .username(member.getEmail())
                .password(member.getPassword())
                .roles(member.getRole().toString())
                .build();
    }
    
    
}