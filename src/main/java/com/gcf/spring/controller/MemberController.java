package com.gcf.spring.controller;

import java.util.Map;
import java.util.Optional; // Optional 임포트 추가

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.constant.Role;
import com.gcf.spring.dto.MemberDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.repository.MemberRepository; // MemberRepository 임포트 추가
import com.gcf.spring.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberController {
    
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository; // MemberRepository 주입 추가

    // 회원가입 할 때 아이디 중복체크
    @GetMapping("/checkId")
    public ResponseEntity<String> checkId(@RequestParam("id") String id) {
        System.out.println("아이디 중복확인");
        return memberService.checkId(id);
    }

    // 회원가입
    @PostMapping("/signUp/ok")
    public ResponseEntity<String> signUp(@RequestBody MemberDto memberDto) {
        try {
            // 서비스의 회원가입 메서드를 호출
            ResponseEntity<String> response = memberService.signUp(memberDto, passwordEncoder);
            return response;
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("이미 존재하는 회원입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 로그인
    @PostMapping("/member/login")
    public ResponseEntity<Member> login(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        String input_id = request.get("id");
        String input_password = request.get("password");

        Member authenticatedMember = memberService.authenticate(input_id, input_password);
        if (authenticatedMember != null) {
            // 로그인 성공 시 세션에 userId 설정
            httpRequest.getSession().setAttribute("userId", authenticatedMember.getId());
            return ResponseEntity.ok(authenticatedMember); // 회원 인증 성공 시 회원 정보 반환
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 인증 실패 시 UNAUTHORIZED 반환
        }
    }

    // 아이디 찾기
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

    // 비밀번호 찾기
    @PostMapping("/member/findPw")
    public ResponseEntity<String> findPw(@RequestBody MemberDto memberDto) {
        try {
            String foundPw = memberService.findPw(memberDto);
            if (foundPw != null) {
                return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("존재하지 않는 회원이거나 잘못 입력된 정보입니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }
    
 // 비밀번호 인증
    @PostMapping("/member/authentication")
    public ResponseEntity<String> verifyPassword(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        String password = request.get("password");
        String userId = (String) httpRequest.getSession().getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        Optional<Member> memberOptional = memberRepository.findById(userId);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            if (passwordEncoder.matches(password, member.getPassword())) {
                return ResponseEntity.ok("인증 성공");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원 정보를 찾을 수 없습니다.");
        }
    }


    @GetMapping("/member/myinfo")
    public ResponseEntity<MemberDto> getMyInfo(HttpServletRequest httpRequest) {
        String userId = (String) httpRequest.getSession().getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        Optional<Member> memberOptional = memberRepository.findById(userId);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            MemberDto memberDto = new MemberDto();
            // 필요한 필드만 설정하여 반환
            memberDto.setId(member.getId());
            memberDto.setName(member.getName());
            memberDto.setEmail(member.getEmail());
            memberDto.setBirth(member.getBirth());
            memberDto.setPhone_number(member.getPhone_number());
            memberDto.setTelNumber(member.getTelNumber());
            memberDto.setAddress(member.getAddress());
            memberDto.setDetail_address(member.getDetail_address());
            memberDto.setEmail_agreement(member.getEmail_agreement());
            memberDto.setMessage_agreement(member.getMessage_agreement());
            memberDto.setMail_agreement(member.getMail_agreement());
            memberDto.setInterests(member.getInterests());
            memberDto.setMarried(member.getMarried());
            memberDto.setHasChildren(member.getHasChildren());
            member.setRole(Role.USER);
            return ResponseEntity.ok(memberDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @PostMapping("/member/update")
    public ResponseEntity<String> updateMember(@RequestBody MemberDto memberDto, HttpServletRequest httpRequest) {
        String userId = (String) httpRequest.getSession().getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        try {
            memberService.updateMember(userId, memberDto);
            return ResponseEntity.ok("회원 정보가 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 정보 업데이트 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/member/delete")
    public ResponseEntity<String> deleteMember(HttpServletRequest httpRequest) {
        String userId = (String) httpRequest.getSession().getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        try {
            memberService.deleteMember(userId);
            httpRequest.getSession().invalidate();
            return ResponseEntity.ok("회원 탈퇴가 성공적으로 처리되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 탈퇴 중 오류가 발생했습니다.");
        }
    }
}
