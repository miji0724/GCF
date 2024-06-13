package com.gcf.spring;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.constant.Role;
import com.gcf.spring.dto.MemberDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.repository.MemberRepository;

@SpringBootTest
public class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    @Transactional
    @Rollback(false) // 롤백 방지
    public void testInsertMembers() {
        List<Member> members = new ArrayList<>();

        // 200개의 데이터 생성
        for (int i = 1; i <= 200; i++) {
            // 테스트 데이터 생성
            MemberDto memberDto = new MemberDto();
            memberDto.setId("test" + i);
            memberDto.setName("테스트 사용자" + i);
            memberDto.setPassword("test_password" + i);
            memberDto.setBirth(LocalDate.of(1990, 1, 1));
            memberDto.setPhone_number("01012345678");
            memberDto.setEmail("test" + i + "@example.com");
            memberDto.setAddress("서울시 강남구");
            memberDto.setEmail_agreement(true);
            memberDto.setMessage_agreement(true);
            memberDto.setMail_agreement(true);
            memberDto.setInterests(Arrays.asList("미술", "음악"));
            memberDto.setMarried(false);
            memberDto.setHasChildren(false);

            // Member 엔티티 생성
            Member member = Member.createMember(memberDto, passwordEncoder);
            member.setRole(Role.USER); // 테스트를 위해 역할 설정

            members.add(member);
        }

        // 생성된 Member 엔티티들을 한 번에 저장
        memberRepository.saveAll(members);

        // 저장된 데이터 확인
        for (int i = 1; i <= 200; i++) {
            String memberId = "test" + i;
            Member savedMember = memberRepository.findById(memberId).orElse(null);
            assert savedMember != null;
            assert savedMember.getName().equals("테스트 사용자" + i);
            // 필요한 경우 다른 필드도 확인할 수 있습니다.
        }
    }
}