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
    public void testCreateAndSaveOffProgram() {
        try {
            // Given
            // Member 엔티티 생성 및 저장
            Member member = new Member();
            member.setId("qweqwe5");
            member.setName("John1212Doe");
            member.setPassword(passwordEncoder.encode("password")); // 암호화된 비밀번호 설정
            member.setBirth(LocalDate.of(1980, 1, 1));
            member.setPhone_number("010-1234-5670");
            member.setTel_number("02-123-4561");
            member.setEmail("jon12212@example.com");
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
            teacher.setMember(member); //
            teacher.setTeacher_category(Arrays.asList("Yoga", "Fitness"));
            teacher.setCareer("10 years experience in Yoga");
            teacher.setCareerStartYear("2010");
            teacher.setCareerEndYear("2020");
            teacher = teacherRepository.save(teacher);

            // OffProgramDto 설정
            OffProgramDto offProgramDto = new OffProgramDto();
            offProgramDto.setProgramName("요가 클래스");
            offProgramDto.setMember(member); // Member 설정
            offProgramDto.setTeacher(teacher);
            offProgramDto.setProgramDetailName("초급 요가 클래스");
            offProgramDto.setApplication_info("지금 신청하세요!");
            offProgramDto.setOperatingStartDay(LocalDate.of(2024, 7, 1));
            offProgramDto.setOperatingEndDay(LocalDate.of(2024, 7, 30));
            offProgramDto.setApplicationStartDate(LocalDate.of(2024, 6, 1));
            offProgramDto.setApplicationEndDate(LocalDate.of(2024, 6, 25));
            offProgramDto.setParticipationFee("무료");
            offProgramDto.setStartTime(LocalTime.of(9, 0));
            offProgramDto.setEndTime(LocalTime.of(10, 0));
            offProgramDto.setMaxParticipants(20);
            offProgramDto.setCurrentParticipants(0);
            offProgramDto.setApplicationState("접수중");
            offProgramDto.setApprovalState("승인대기");
            offProgramDto.setDayOfWeek(Day_of_week.금요일);
            offProgramDto.setViews(0);
            offProgramDto.setLikesCount(0);
            offProgramDto.setOfflineCategory("교육");
            offProgramDto.setPlaceName("커뮤니티 센터");
            offProgramDto.setProgramType("오프라인");

            // When
            OffProgram offProgram = OffProgram.createOffProgram(offProgramDto);
            offProgram = offProgramRepository.save(offProgram);

            // Then
            OffProgram found = offProgramRepository.findById(offProgram.getId()).orElse(null);
            assertNotNull(found);
            assertEquals("요가 클래스", found.getProgramName());
            assertNotNull(found.getTeacher());
            assertEquals("초급 요가 클래스", found.getProgramDetailName());
            assertEquals("지금 신청하세요!", found.getApplication_info());
            assertEquals(LocalDate.of(2024, 7, 1), found.getOperatingStartDay());
            assertEquals(LocalDate.of(2024, 7, 30), found.getOperatingEndDay());
            assertEquals(LocalDate.of(2024, 6, 1), found.getApplicationStartDate());
            assertEquals(LocalDate.of(2024, 6, 25), found.getApplicationEndDate());
            assertEquals("무료", found.getParticipationFee());
            assertEquals(LocalTime.of(9, 0), found.getStartTime());
            assertEquals(LocalTime.of(10, 0), found.getEndTime());
            assertEquals(20, found.getMaxParticipants().intValue());
            assertEquals(0, found.getCurrentParticipants().intValue());
            assertEquals("접수중", found.getApplicationState());
            assertEquals("승인대기", found.getApprovalState());
            assertEquals(Day_of_week.금요일, found.getDayOfWeek());
            assertEquals(0, found.getViews().intValue());
            assertEquals(0, found.getLikesCount().intValue());
            assertEquals("교육", found.getCategory());
            assertEquals("커뮤니티 센터", found.getPlaceName());
            assertEquals("오프라인", found.getProgramType());
        } catch (Exception e) {
            e.printStackTrace(); // 예외 로그 출력
        }
    }
}
