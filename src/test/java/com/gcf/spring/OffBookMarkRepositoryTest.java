package com.gcf.spring;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.constant.Day_of_week;
import com.gcf.spring.constant.Role;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.OffBookMark;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.repository.OffBookMarkRepository;
import com.gcf.spring.repository.OffProgramRepository;

@SpringBootTest
@Transactional
@Rollback(false)  // 롤백을 비활성화하여 문제를 디버그
public class OffBookMarkRepositoryTest {

    @Autowired
    private OffBookMarkRepository offBookMarkRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private OffProgramRepository offProgramRepository;

    private Member member;
    private OffProgram offProgram;

    @BeforeEach
    public void setup() {
        // 초기화
        offBookMarkRepository.deleteAll();
        memberRepository.deleteAll();
        offProgramRepository.deleteAll();

        // 고유한 테스트 데이터 생성
        String uniqueId = UUID.randomUUID().toString();

        member = new Member();
        member.setId("test_id_" + uniqueId);
        member.setName("Test Member");
        member.setPassword("password");
        member.setBirth(LocalDate.of(1990, 1, 1));
        member.setPhone_number("010-1234-5678");
        member.setEmail("test_" + uniqueId + "@example.com");
        member.setAddress("Test Address");
        member.setEmail_agreement(true);
        member.setMessage_agreement(true);
        member.setMail_agreement(true);
        member.setRole(Role.USER);
        member = memberRepository.save(member);

        offProgram = new OffProgram();
        offProgram.setProgramName("Test Program");
        offProgram.setProgramDetailName("Test Program Detail");
        offProgram.setApplication_info("Application Info");
        offProgram.setApplicationStartDate(LocalDate.now());
        offProgram.setApplicationEndDate(LocalDate.now().plusDays(10));
        offProgram.setOperatingStartDay(LocalDate.now().plusDays(20));
        offProgram.setOperatingEndDay(LocalDate.now().plusDays(30));
        offProgram.setParticipationFee("10000");
        offProgram.setStartTime(LocalTime.of(10, 0));
        offProgram.setEndTime(LocalTime.of(12, 0));
        offProgram.setMaxParticipants(20);
        offProgram.setCurrentParticipants(0);
        offProgram.setApplicationState("접수중");
        offProgram.setApprovalState("승인대기");
        offProgram.setDayOfWeek(Day_of_week.월요일);
        offProgram.setViews(0);
        offProgram.setLikesCount(0);
        offProgram.setCategory("교육");
        offProgram.setPlaceName("장소명");
        offProgram.setProgramType("오프라인");
        offProgram = offProgramRepository.save(offProgram);
    }

    @Test
    public void testSaveAndFind() {
        OffBookMark offBookMark = new OffBookMark();
        offBookMark.setMember(member);
        offBookMark.setOffProgram(offProgram);
        offBookMark = offBookMarkRepository.save(offBookMark);

        OffBookMark savedOffBookMark = offBookMarkRepository.findById(offBookMark.getId()).orElse(null);
        assertThat(savedOffBookMark).isNotNull();
        assertThat(savedOffBookMark.getMember().getId()).isEqualTo(member.getId());
        assertThat(savedOffBookMark.getOffProgram().getId()).isEqualTo(offProgram.getId());
    }

    @Test
    public void testDelete() {
        OffBookMark offBookMark = new OffBookMark();
        offBookMark.setMember(member);
        offBookMark.setOffProgram(offProgram);
        offBookMark = offBookMarkRepository.save(offBookMark);

        offBookMarkRepository.delete(offBookMark);
        OffBookMark deletedOffBookMark = offBookMarkRepository.findById(offBookMark.getId()).orElse(null);
        assertThat(deletedOffBookMark).isNull();
    }
}
