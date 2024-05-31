package com.gcf.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.dto.MemberDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberController {
		
	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder;
	
	@Autowired
	private MemberRepository memberRepository;
	
	@GetMapping("/getAll")
	public List<Member> getAllMembers(){
		return memberService.getAllMembers();
	}
	
	@PutMapping("/manage/modify/{id}")
	public Member memberModifyInManage(@RequestBody MemberDto memberDto) {
		return memberService.memberUpdateInManage(memberDto, passwordEncoder);
	}
	
//    @GetMapping("/checkId")
//    public ResponseEntity<String> checkId(@RequestParam("id") String id) {
//        return memberService.checkId(id);
//    }
//    
//    @PostMapping("/signUp")
//    public ResponseEntity<String> signUp(@RequestBody MemberDto memberDto) {
//        return memberService.signUp(memberDto, passwordEncoder);
//    }
//    
//    @GetMapping("/create")
//    public ResponseEntity<String> test() {
//        Member member = new Member();
//        List<String> interests = new ArrayList<>();
//        interests.add("음악");
//        interests.add("미술");
//        
//        member.setId("admin");
//        member.setName("홍길동");
//        member.setPassword(passwordEncoder.encode("1234"));
//        member.setBirth(LocalDate.of(2000, 01, 01));
//        member.setPhone_number("010-1234-1234");
//        member.setTel_number("042-123-1234");
//        member.setEmail("test@test.com");
//        member.setAddress("대전시 중구");
//        member.setDetail_address("산성동");
//        member.setEmail_agreement(true);
//        member.setMessage_agreement(true);
//        member.setMail_agreement(true);
//        member.setMarried(true);
//        member.setHasChildren(true);
//        member.setRole(Role.ADMIN);
//
//        memberService.signUp(member);
//        return ResponseEntity.ok("어드민 계정");
//    }      
}