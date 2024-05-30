package com.gcf.spring.service;

import java.util.List;
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
    private final PasswordEncoder passwordEncoder; 
    // 회원가입
    public ResponseEntity<String> signUp(MemberDto memberDto, PasswordEncoder passwordEncoder) {
        // 비밀번호 일치 여부 확인
        if (!isPasswordMatch(memberDto.getPassword(), memberDto.getConfirm_password())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 일치하지 않습니다.");
        }

        Member member = Member.createMember(memberDto, passwordEncoder);
        member.setRole(Role.USER);

        try {
            // 회원 정보를 데이터베이스에 저장
            memberRepository.save(member);

            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 중 오류가 발생했습니다.");
        }
    }
    
    public void signUp(Member member) {
        memberRepository.save(member);
    }
    
    public boolean existsById(String id) {
        System.out.println("아이디 존재 확인");
        return memberRepository.existsById(id);
    }
    
    public ResponseEntity<String> checkId(String id) {
        if (existsById(id)) {
            return ResponseEntity.ok("이미 사용 중인 아이디입니다.");
        } else {
            return ResponseEntity.ok("사용 가능한 아이디입니다.");
        }
    }
    
    
    public boolean isPasswordMatch(String password, String confirm_password) {
        return password.equals(confirm_password);
    }
    
    public List<Member> getAllMembers(){
    	return memberRepository.findAll();
    }
    
    public Member memberModifyInManage(MemberDto memberDto, PasswordEncoder passwordEncoder) {
        // 1. MemberDto 객체로부터 수정된 회원 정보를 추출합니다.
        String memberId = memberDto.getId(); // 혹은 다른 방식으로 회원을 식별하는 정보를 사용할 수 있습니다.
        
        // 회원을 찾지 못한 경우에 대한 처리
        Member existingMember = memberRepository.findById(memberId).orElse(null);
        
        // 회원을 찾지 못했을 때의 처리
        if (existingMember == null) {
            // 처리할 작업을 수행합니다. 예를 들어 예외를 던지거나 다른 방식으로 사용자에게 알릴 수 있습니다.
            System.out.println("회원을 찾을 수 없습니다.");
            return null; // 또는 다른 적절한 처리를 수행할 수 있습니다.
        }
        
        // 새로운 회원 정보 업데이트
        existingMember.setName(memberDto.getName());
        existingMember.setEmail(memberDto.getEmail());
        // 필요한 다른 정보들도 동일하게 업데이트합니다.

        // 비밀번호 업데이트
        String newPassword = memberDto.getPassword();
        if (newPassword != null && !newPassword.isEmpty()) {
            String encryptedPassword = passwordEncoder.encode(newPassword);
            existingMember.setPassword(encryptedPassword);
        }

        // 2. 업데이트된 회원 정보를 저장하고 반환합니다.
        return memberRepository.save(existingMember);
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