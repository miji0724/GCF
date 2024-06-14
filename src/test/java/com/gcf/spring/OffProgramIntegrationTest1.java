package com.gcf.spring;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.constant.Day_of_week;
import com.gcf.spring.constant.Role;
import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.repository.OffProgramRepository;
import com.gcf.spring.repository.TeacherRepository;

@SpringBootTest
@Transactional
@Rollback(false)
public class OffProgramIntegrationTest1 {

    @Autowired
    private OffProgramRepository offProgramRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testCreateAndSaveOffPrograms() {
        try {
            // Given
            // Member 엔티티 생성 및 저장
            Member member = new Member();
            member.setId("qweqwe");
            member.setName("John1212Doe");
            member.setPassword(passwordEncoder.encode("123123")); // 암호화된 비밀번호 설정
            member.setBirth(LocalDate.of(1980, 1, 1));
            member.setPhone_number("010-1234-5670");
            member.setTel_number("02-123-4561");
            member.setEmail("jon12223212@example.com");
            member.setAddress("123Street, City");
            member.setDetail_address("Apt 1001");
            member.setEmail_agreement(true);
            member.setMessage_agreement(true);
            member.setMail_agreement(true);
            member.setMarried(false);
            member.setHasChildren(false);
            member.setRole(Role.ADMIN);
            member.setCreatedAt(LocalDateTime.now());
            member = memberRepository.save(member);

            // Teacher 엔티티 생성 및 저장
            Teacher teacher = new Teacher();
            teacher.setMember(member);
            teacher.setTeacher_category(Arrays.asList("Yoga", "Fitness"));
            teacher.setCareer("10 years experience in Yoga");
            teacher.setCareerStartYear("2010");
            teacher.setCareerEndYear("2020");
            teacher = teacherRepository.save(teacher);

            // 첫 번째 OffProgramDto 설정
            OffProgramDto offProgramDto1 = new OffProgramDto();
            offProgramDto1.setProgramName("Yoga Class 1");
            offProgramDto1.setMember(member); // Member 설정
            offProgramDto1.setTeacher(teacher);
            offProgramDto1.setProgramDetailName("초급 요가 클래스 1");
            offProgramDto1.setApplication_info("asd");
            offProgramDto1.setOperatingStartDay(LocalDate.of(2024, 7, 1));
            offProgramDto1.setOperatingEndDay(LocalDate.of(2024, 7, 30));
            offProgramDto1.setApplicationStartDate(LocalDate.of(2024, 6, 1));
            offProgramDto1.setApplicationEndDate(LocalDate.of(2024, 6, 25));
            offProgramDto1.setParticipationFee("무료");
            offProgramDto1.setStartTime(LocalTime.of(9, 0));
            offProgramDto1.setEndTime(LocalTime.of(10, 0));
            offProgramDto1.setMaxParticipants(20);
            offProgramDto1.setCurrentParticipants(0);
            offProgramDto1.setApplicationState("접수중");
            offProgramDto1.setApprovalState("승인대기");
            offProgramDto1.setDayOfWeek(Day_of_week.금요일);
            offProgramDto1.setViews(0);
            offProgramDto1.setLikesCount(0);
            offProgramDto1.setCategory("교육");
            offProgramDto1.setPlaceName("커뮤니티 센터");
            offProgramDto1.setProgramType("오프라인");

            // 두 번째 OffProgramDto 설정
            OffProgramDto offProgramDto2 = new OffProgramDto();
            offProgramDto2.setProgramName("Yoga Class 2");
            offProgramDto2.setMember(member); // Member 설정
            offProgramDto2.setTeacher(teacher);
            offProgramDto2.setProgramDetailName("초급 요가 클래스 2");
            offProgramDto2.setApplication_info("지금 신청하세요!");
            offProgramDto2.setOperatingStartDay(LocalDate.of(2024, 8, 1));
            offProgramDto2.setOperatingEndDay(LocalDate.of(2024, 8, 30));
            offProgramDto2.setApplicationStartDate(LocalDate.of(2024, 7, 1));
            offProgramDto2.setApplicationEndDate(LocalDate.of(2024, 7, 25));
            offProgramDto2.setParticipationFee("무료");
            offProgramDto2.setStartTime(LocalTime.of(10, 0));
            offProgramDto2.setEndTime(LocalTime.of(11, 0));
            offProgramDto2.setMaxParticipants(20);
            offProgramDto2.setCurrentParticipants(0);
            offProgramDto2.setApplicationState("접수중");
            offProgramDto2.setApprovalState("승인대기");
            offProgramDto2.setDayOfWeek(Day_of_week.목요일);
            offProgramDto2.setViews(0);
            offProgramDto2.setLikesCount(0);
            offProgramDto2.setCategory("교육");
            offProgramDto2.setPlaceName("커뮤니티 센터");
            offProgramDto2.setProgramType("오프라인");

            // When
            OffProgram offProgram1 = OffProgram.createOffProgram(offProgramDto1);
            offProgram1 = offProgramRepository.save(offProgram1);

            OffProgram offProgram2 = OffProgram.createOffProgram(offProgramDto2);
            offProgram2 = offProgramRepository.save(offProgram2);

            // Then
            OffProgram found1 = offProgramRepository.findById(offProgram1.getId()).orElse(null);
            assertNotNull(found1);
            assertEquals("Yoga Class 1", found1.getProgramName());
            assertNotNull(found1.getTeacher());
            assertEquals("초급 요가 클래스 1", found1.getProgramDetailName());
            assertEquals("asd", found1.getApplication_info());
            assertEquals(LocalDate.of(2024, 7, 1), found1.getOperatingStartDay());
            assertEquals(LocalDate.of(2024, 7, 30), found1.getOperatingEndDay());
            assertEquals(LocalDate.of(2024, 6, 1), found1.getApplicationStartDate());
            assertEquals(LocalDate.of(2024, 6, 25), found1.getApplicationEndDate());
            assertEquals("무료", found1.getParticipationFee());
            assertEquals(LocalTime.of(9, 0), found1.getStartTime());
            assertEquals(LocalTime.of(10, 0), found1.getEndTime());
            assertEquals(20, found1.getMaxParticipants().intValue());
            assertEquals(0, found1.getCurrentParticipants().intValue());
            assertEquals("접수중", found1.getApplicationState());
            assertEquals("승인대기", found1.getApprovalState());
            assertEquals(Day_of_week.금요일, found1.getDayOfWeek());
            assertEquals(0, found1.getViews().intValue());
            assertEquals(0, found1.getLikesCount().intValue());
            assertEquals("교육", found1.getCategory());
            assertEquals("커뮤니티 센터", found1.getPlaceName());
            assertEquals("오프라인", found1.getProgramType());

            OffProgram found2 = offProgramRepository.findById(offProgram2.getId()).orElse(null);
            assertNotNull(found2);
            assertEquals("Yoga Class 2", found2.getProgramName());
            assertNotNull(found2.getTeacher());
            assertEquals("초급 요가 클래스 2", found2.getProgramDetailName());
            assertEquals("지금 신청하세요!", found2.getApplication_info());
            assertEquals(LocalDate.of(2024, 8, 1), found2.getOperatingStartDay());
            assertEquals(LocalDate.of(2024, 8, 30), found2.getOperatingEndDay());
            assertEquals(LocalDate.of(2024, 7, 1), found2.getApplicationStartDate());
            assertEquals(LocalDate.of(2024, 7, 25), found2.getApplicationEndDate());
            assertEquals("무료", found2.getParticipationFee());
            assertEquals(LocalTime.of(10, 0), found2.getStartTime());
            assertEquals(LocalTime.of(11, 0), found2.getEndTime());
            assertEquals(20, found2.getMaxParticipants().intValue());
            assertEquals(0, found2.getCurrentParticipants().intValue());
            assertEquals("접수중", found2.getApplicationState());
            assertEquals("승인대기", found2.getApprovalState());
            assertEquals(Day_of_week.목요일, found2.getDayOfWeek());
            assertEquals(0, found2.getViews().intValue());
            assertEquals(0, found2.getLikesCount().intValue());
            assertEquals("교육", found2.getCategory());
            assertEquals("커뮤니티 센터", found2.getPlaceName());
            assertEquals("오프라인", found2.getProgramType());
        } catch (Exception e) {
            e.printStackTrace(); // 예외 로그 출력
        }
    }
}