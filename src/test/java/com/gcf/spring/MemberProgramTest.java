package com.gcf.spring;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import com.gcf.spring.constant.Role;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.repository.OffProgramRepository;
import com.gcf.spring.repository.OnProgramRepository;

@SpringBootTest
@ActiveProfiles("test")
public class MemberProgramTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private OnProgramRepository onProgramRepository;

    @Autowired
    private OffProgramRepository offProgramRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    public void testMemberWithPrograms() {
        // Create and save OnProgram
        OnProgram onProgram = new OnProgram();
        onProgram.setProgramName("Online Program 1");
        onProgram.setOperatingStartDay(LocalDate.now());
        onProgram.setCategory("Education");
        onProgram.setProgramType("Online");
        onProgram.setApprovalState("Approved");
        onProgramRepository.save(onProgram);

        // Create and save OffProgram
        OffProgram offProgram = new OffProgram();
        offProgram.setProgramName("Offline Program 1");
        offProgram.setApplicationStartDate(LocalDate.now());
        offProgram.setApplicationEndDate(LocalDate.now().plusDays(10));
        offProgram.setOperatingStartDay(LocalDate.now().plusDays(15));
        offProgram.setOperatingEndDay(LocalDate.now().plusDays(30));
        offProgram.setParticipationFee("Free");
        offProgram.setStartTime(LocalDate.now().atTime(10, 0).toLocalTime());
        offProgram.setEndTime(LocalDate.now().atTime(12, 0).toLocalTime());
        offProgram.setMaxParticipants(30);
        offProgram.setApplicationState("Open");
        offProgram.setApprovalState("Approved");
        offProgram.setCategory("Experience");
        offProgram.setPlaceName("Community Center");
        offProgram.setProgramType("Offline");
        offProgramRepository.save(offProgram);

        // Create and save Member
        Member member = new Member();
        member.setId("testMember");
        member.setName("Test Member");
        member.setPassword(passwordEncoder.encode("password"));
        member.setBirth(LocalDate.of(1990, 1, 1));
        member.setPhone_number("010-1234-5678");
        member.setEmail("test@example.com");
        member.setAddress("123 Test St");
        member.setEmail_agreement(true);
        member.setMessage_agreement(true);
        member.setMail_agreement(true);
        member.setRole(Role.USER);
        member.setApplyOnProgram(List.of(onProgram));
        member.setApplyOffProgram(List.of(offProgram));
        memberRepository.save(member);

        // Retrieve and test Member
        Member savedMember = memberRepository.findById("testMember").orElse(null);
        assertThat(savedMember).isNotNull();
        assertThat(savedMember.getApplyOnProgram()).hasSize(1);
        assertThat(savedMember.getApplyOffProgram()).hasSize(1);
        assertThat(savedMember.getApplyOnProgram().get(0).getProgramName()).isEqualTo("Online Program 1");
        assertThat(savedMember.getApplyOffProgram().get(0).getProgramName()).isEqualTo("Offline Program 1");
    }
}
