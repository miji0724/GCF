package com.gcf.spring.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.constant.Role;
import com.gcf.spring.dto.MemberDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberController {
		
	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder;
	
	@Autowired
	private MemberRepository memberRepository;
	
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

    
    // 로그아웃 처리
    @PostMapping("/member/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 세션이 존재하면 세션을 반환하고, 존재하지 않으면 null 반환
        if (session != null) {
            session.invalidate(); // 세션 무효화
        }
        return ResponseEntity.ok("로그아웃 되었습니다.");
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
            memberDto.setTelNumber(member.getTel_number());
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
            System.out.println("Updating member with ID: " + userId);
            memberService.updateMember(userId, memberDto);
            return ResponseEntity.ok("회원 정보가 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            e.printStackTrace(); // 상세한 에러 메시지 로그 출력
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
    
    
    @GetMapping("/manage/getAllMembers")
	public List<Member> getAllMembers(){
		return memberService.getAllMembers();
	}
	
	@PutMapping("/manage/modify/{id}")
	public Member memberUpdateInManage(@RequestBody MemberDto memberDto) {
		return memberService.memberUpdateInManage(memberDto, passwordEncoder);
	}
	
	@GetMapping("/manage/searchMembers")
    public List<Member> searchMembers(@RequestParam("searchType") String searchType, @RequestParam("searchTerm") String searchTerm) {
        if (searchType.equals("member_name")) {
            return memberRepository.findByNameContainingIgnoreCase(searchTerm);
        } else if (searchType.equals("member_joinDate")) {
            return memberRepository.findByCreatedAtContainingIgnoreCase(searchTerm);
        }
        return List.of(); // 빈 리스트 반환
    }
    
	  @GetMapping("/member/getUserRole")
	    public ResponseEntity<Role> sendUserRole(HttpServletRequest httpRequest) {
	        String userId = (String) httpRequest.getSession().getAttribute("userId");

	        if (userId != null) {
	            Role role = memberService.getUserRole(userId);
	            if (role != null) {
	                return ResponseEntity.ok(role);
	            } else {
	                // 처리할 수 없는 상황에 따른 예외 처리
	                return ResponseEntity.notFound().build(); // 예시로 404 에러 반환
	            }
	        } else {
	            // 세션에 userId가 없는 경우에 대한 예외 처리
	            return ResponseEntity.badRequest().build(); // 예시로 400 에러 반환
	        }
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
