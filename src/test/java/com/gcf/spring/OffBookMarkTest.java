package com.gcf.spring;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.constant.Day_of_week;
import com.gcf.spring.dto.MemberDto;
import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.OffBookMark;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.repository.OffBookMarkRepository;
import com.gcf.spring.repository.OffProgramRepository;

@SpringBootTest
@Transactional
@Rollback(false)
public class OffBookMarkTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private OffProgramRepository offProgramRepository;
    
    @Autowired
    private OffBookMarkRepository offBookMarkRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    public void testCreateOffBookMark() {
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
        memberRepository.save(member);

        // Create OffProgram
        OffProgramDto offProgramDto = new OffProgramDto();
        offProgramDto.setProgramName("Test Program");
        offProgramDto.setProgramDetailName("Test Program Detail");
        offProgramDto.setApplicationInfo("Test Application Info");
        offProgramDto.setApplicationStartDate(LocalDate.of(2024, 7, 1));
        offProgramDto.setApplicationEndDate(LocalDate.of(2024, 7, 31));
        offProgramDto.setOperatingStartDay(LocalDate.of(2024, 8, 1));
        offProgramDto.setOperatingEndDay(LocalDate.of(2024, 8, 31));
        offProgramDto.setParticipationFee("Free");
        offProgramDto.setStartTime(LocalTime.of(10, 0));
        offProgramDto.setEndTime(LocalTime.of(12, 0));
        offProgramDto.setMaxParticipants(20);
        offProgramDto.setCurrentParticipants(0);
        offProgramDto.setApplicationState("Open");
        offProgramDto.setApprovalState("Pending");
        offProgramDto.setDayOfWeek(Day_of_week.화요일);
        offProgramDto.setViews(0);
        offProgramDto.setLikesCount(0);
        offProgramDto.setOfflineCategory("Education");
        offProgramDto.setPlaceName("Test Place");
        offProgramDto.setProgramType("Offline");

        OffProgram offProgram = OffProgram.createOffProgram(offProgramDto);
        offProgramRepository.save(offProgram);

        // Create OffBookMark
        OffBookMark offBookMark = new OffBookMark();
        offBookMark.setMember(member);
        offBookMark.setOffProgram(offProgram);
        offBookMarkRepository.save(offBookMark);

        OffBookMark foundOffBookMark = offBookMarkRepository.findById(offBookMark.getId()).orElse(null);
        assertNotNull(foundOffBookMark);
        assertEquals(member.getId(), foundOffBookMark.getMember().getId());
        assertEquals(offProgram.getId(), foundOffBookMark.getOffProgram().getId());
    }
}
