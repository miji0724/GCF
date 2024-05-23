package com.gcf.spring.service;

import java.util.Optional;
import java.util.regex.Pattern;

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
    
    private boolean isValidId(String id) {
        String regex = "^[a-zA-Z0-9]{5,20}$";
        return Pattern.matches(regex, id);
    }
    

    public boolean existsById(String id) {
        System.out.println("아이디 존재 확인");
        return memberRepository.existsById(id);
    }
    
    public ResponseEntity<String> checkId(String id) {
        if (!isValidId(id)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body("아이디는 5글자 이상, 20자 이하이어야 하며 영문과 숫자를 포함해야 합니다. 특수문자는 사용 불가합니다.");
        }
  
        if (existsById(id)) {
            return ResponseEntity.ok("이미 사용 중인 아이디입니다. 아이디를 변경해주세요.");
        } else {
            return ResponseEntity.ok("사용 가능한 아이디입니다.");
        }
    }
    
    public boolean isPasswordMatch(String password, String confirm_password) {
        return password.equals(confirm_password);
    }
    
    // 회원가입
    public ResponseEntity<String> signUp(MemberDto memberDto, PasswordEncoder passwordEncoder) {
        // 아이디 유효성 검사
        if (!isValidId(memberDto.getId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body("아이디는 5글자 이상, 20자 이하이어야 하며 영문과 숫자를 포함해야 합니다. 특수문자는 사용 불가합니다.");
        }

        // 비밀번호 일치 여부 확인
        if (!isPasswordMatch(memberDto.getPassword(), memberDto.getConfirm_password())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
        }

        // 아이디 중복 체크
        if (existsById(memberDto.getId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 사용 중인 아이디입니다. 아이디를 변경해주세요.");
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
    
    public Member authenticate(String id, String password) {
        try {
            Optional<Member> memberOptional = memberRepository.findById(id);

            if (memberOptional.isPresent()) {
                Member member = memberOptional.get();
                System.out.println(member);
                
                // 비밀번호 매칭
                boolean matches = passwordEncoder.matches(password, member.getPassword());
                System.out.println("비밀번호 매칭 결과: " + matches);
                if (matches) {
                    return member; // 비밀번호가 일치하는 경우 회원 정보 반환
                } else {
                    System.out.println("비밀번호가 일치하지 않습니다.");
                    return null; // 비밀번호가 일치하지 않는 경우 null 반환
                }
            } else {
                System.out.println("회원이 존재하지 않습니다.");
                return null; // 회원이 존재하지 않는 경우 null 반환
            }
        } catch (Exception e) {
            System.out.println("예외: " + e.getMessage());
            return null; // 예외 발생 시 null 반환
        }
    }
    
    public Member authenticateByPassword(String password) {
        try {
            // 사용자를 아이디로 조회하여 Optional로 반환
            Optional<Member> memberOptional = memberRepository.findById(password);

            if (memberOptional.isPresent()) {
                Member member = memberOptional.get();
                // 조회된 회원의 비밀번호를 비교하여 일치하는 경우 회원 정보 반환
                boolean matches = passwordEncoder.matches(password, member.getPassword());
                if (matches) {
                    return member;
                } else {
                    return null; // 비밀번호가 일치하지 않는 경우 null 반환
                }
            } else {
                return null; // 조회된 회원이 없는 경우 null 반환
            }
        } catch (Exception e) {
            System.out.println("예외: " + e.getMessage());
            return null; // 예외 발생 시 null 반환
        }
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
    
    public String findId(MemberDto memberDto) {
        Optional<Member> foundMember = memberRepository.findIdByNameAndEmail(memberDto.getName(), memberDto.getEmail());
        if (foundMember.isPresent()) {
            Member member = foundMember.get();
            System.out.println(member);
            
            String findId = member.getId();
            System.out.println(findId);
            
            return findId;
        } else {
            return null;
        }
    }
}