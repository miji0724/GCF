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

    public boolean isPasswordMatch(String password, String confirmPassword) {
        return password.equals(confirmPassword);
    }

    public ResponseEntity<String> signUp(MemberDto memberDto) {
        if (!isValidId(memberDto.getId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body("아이디는 5글자 이상, 20자 이하이어야 하며 영문과 숫자를 포함해야 합니다. 특수문자는 사용 불가합니다.");
        }

        if (!isPasswordMatch(memberDto.getPassword(), memberDto.getConfirm_password())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
        }

        if (existsById(memberDto.getId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 사용 중인 아이디입니다. 아이디를 변경해주세요.");
        }

        Member member = Member.createMember(memberDto, passwordEncoder);
        member.setRole(Role.USER);

        try {
            memberRepository.save(member);
            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 중 오류가 발생했습니다");
        }
    }

    public Member authenticate(String id, String password) {
        return authenticateByPassword(id, password);
    }

    public Member authenticateByPassword(String id, String password) {
        System.out.println("Authenticating user: " + id);
        Optional<Member> memberOptional = memberRepository.findById(id);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            System.out.println("Found user: " + member.getId());
            if (passwordEncoder.matches(password, member.getPassword())) {
                System.out.println("Password matches for user: " + member.getId());
                return member;
            } else {
                System.out.println("Password does not match for user: " + member.getId());
            }
        } else {
            System.out.println("User not found: " + id);
        }
        return null;
    }


    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findById(id);
        if (optionalMember.isEmpty()) {
            throw new UsernameNotFoundException(id);
        }
        Member member = optionalMember.get();
        return User.builder()
                   .username(member.getId()) // 로그인 시 사용자의 ID를 유저네임으로 사용
                   .password(member.getPassword())
                   .roles(member.getRole().toString())
                   .build();
    }

    public String findId(MemberDto memberDto) {
        Optional<Member> foundMember = memberRepository.findIdByNameAndEmail(memberDto.getName(), memberDto.getEmail());
        return foundMember.map(Member::getId).orElse(null);
    }

    public MemberDto getUserInfo(String userId) {
        Optional<Member> memberOptional = memberRepository.findById(userId);
        return memberOptional.map(this::convertToDto).orElse(null);
    }

    private MemberDto convertToDto(Member member) {
        MemberDto memberDto = new MemberDto();
        memberDto.setName(member.getName());
        memberDto.setId(member.getId());
        memberDto.setBirth(member.getBirth());
        memberDto.setPhone_number(member.getPhone_number());
        memberDto.setTelNumber(member.getTelNumber());
        memberDto.setEmail(member.getEmail());
        memberDto.setAddress(member.getAddress());
        memberDto.setDetail_address(member.getDetail_address());
        memberDto.setEmail_agreement(member.getEmail_agreement());
        memberDto.setMessage_agreement(member.getMessage_agreement());
        memberDto.setMail_agreement(member.getMail_agreement());
        memberDto.setInterests(member.getInterests());
        memberDto.setMarried(member.getMarried());
        memberDto.setHasChildren(member.getHasChildren());
        return memberDto;
    }
}
