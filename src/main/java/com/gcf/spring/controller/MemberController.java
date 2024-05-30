package com.gcf.spring.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.dto.MemberDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberController {
		
	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder;
	
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
    public ResponseEntity<Member> login(@RequestBody Map<String, String> request, HttpServletRequest httpRequest, HttpSession session) {
        String inputId = request.get("id");
        String inputPassword = request.get("password");

        Member authenticatedMember = memberService.authenticate(inputId, inputPassword);

        if (authenticatedMember != null) {
            session.setAttribute("member", authenticatedMember);
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
    
    @PostMapping("/member/authentication")
    public ResponseEntity<?> verifyPassword(@RequestBody Map<String, String> request, HttpSession session) {
        String password = request.get("password");

        // 세션에서 사용자 정보를 가져오기 전에 세션에 저장된 값이 있는지 확인합니다.
        if (session.getAttribute("member") == null) {
        	System.out.println("세션없음");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        // 세션에서 가져온 사용자의 정보를 사용합니다.
        Member loginMember = (Member) session.getAttribute("member");
        System.out.println(loginMember);
        // 세션에서 가져온 사용자의 비밀번호와 입력된 비밀번호를 비교합니다.
        if (passwordEncoder.matches(password, loginMember.getPassword())) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }
    }
    
    // 로그아웃 처리
    @PostMapping("/member/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 세션이 존재하면 세션을 반환하고, 존재하지 않으면 null 반환
        if (session != null) {
            session.invalidate(); // 세션 무효화
        }
        return ResponseEntity.ok("로그아웃 되었습니다.");
    }

    // 임시 회원 만들기
//    @GetMapping("/create")
//    public ResponseEntity<String> test() {
//        Member member = new Member();
//        List<String> interests = new ArrayList<>();
//        interests.add("음악");
//        interests.add("미술");
//        
//        member.setId("test");
//        member.setName("홍길동");
//        member.setPassword(passwordEncoder.encode("1234"));
//        member.setBirth(LocalDate.of(2000, 01, 01));
//        member.setPhone_number("010-1234-1234");
//        member.setTel_number("042-123-1234");
//        member.setEmail("test@test.com");
//        member.setAddress("대전시 중구");
//        member.setDetail_address("산성동");
//        member.setInterests(interests);
//        member.setEmail_agreement(true);
//        member.setMessage_agreement(true);
//        member.setMail_agreement(true);
//        member.setMarried(true);
//        member.setHasChildren(true);
//        member.setRole(Role.USER);
//
//        memberService.signUp(member);
//        return ResponseEntity.ok("테스트 유저");
//    }
        
}
