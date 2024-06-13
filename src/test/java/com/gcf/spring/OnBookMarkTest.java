package com.gcf.spring;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.dto.MemberDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.OnBookMark;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.repository.OnBookMarkRepository;
import com.gcf.spring.repository.OnProgramRepository;

@SpringBootTest
@Transactional
@Rollback(false)
public class OnBookMarkTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private OnProgramRepository onProgramRepository;
    
    @Autowired
    private OnBookMarkRepository onBookMarkRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    public void testCreateOnBookMark() {
        // Create Member
        MemberDto memberDto = new MemberDto();
        memberDto.setId("testuser");
        memberDto.setName("Test User");
        memberDto.setPassword("password");
        memberDto.setBirth(LocalDate.of(1990, 1, 1));
        memberDto.setPhone_number("010-1234-5678");
        memberDto.setTel_number("02-1234-5678");
        memberDto.setEmail("testuser@example.com");
        memberDto.setAddress("Test Address");
        memberDto.setDetail_address("Test Detail Address");
        memberDto.setEmail_agreement(true);
        memberDto.setMessage_agreement(true);
        memberDto.setMail_agreement(true);
        memberDto.setInterests(Collections.singletonList("Reading"));
        memberDto.setMarried(false);
        memberDto.setHasChildren(false);

        Member member = Member.createMember(memberDto, passwordEncoder);
        member.setCreatedAt(LocalDateTime.now());  // 추가된 부분
        memberRepository.save(member);

        // Create OnProgram
        OnProgram onProgram = new OnProgram();
        onProgram.setProgramName("Test Online Program");
        onProgram.setOperatingStartDay(LocalDate.of(2024, 7, 1));
        onProgram.setViews(0);
        onProgram.setLikesCount(0);
        onProgram.setCategory("Education");
        onProgram.setProgramType("Online");
        onProgram.setApprovalState("Pending");

        onProgramRepository.save(onProgram);

        // Create OnBookMark
        OnBookMark onBookMark = new OnBookMark();
        onBookMark.setMember(member);
        onBookMark.setOnProgram(onProgram);
        onBookMarkRepository.save(onBookMark);

        OnBookMark foundOnBookMark = onBookMarkRepository.findById(onBookMark.getId()).orElse(null);
        assertNotNull(foundOnBookMark);
        assertEquals(member.getId(), foundOnBookMark.getMember().getId());
        assertEquals(onProgram.getId(), foundOnBookMark.getOnProgram().getId());
    }
}
