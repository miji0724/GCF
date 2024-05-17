package com.gcf.spring.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.entity.Member;
import com.gcf.spring.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {
	
	private final MemberRepository memberRepository;

	public Member saveMember(Member member) {
		validateDuplicateMember(member);	// 가입된 회원이 있는지 찾기
		return memberRepository.save(member);
	}
	
	private void validateDuplicateMember(Member member){
		 Optional<Member> findMember = memberRepository.findById(member.getId());
		 if(findMember != null){
			 throw new IllegalStateException("이미 가입된 회원입니다."); // 이미 가입된 회원의 경우 예외를 발생시킨다.
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
	
	
}
