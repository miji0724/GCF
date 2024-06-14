package com.gcf.spring;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.constant.Role;
import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.repository.OnProgramRepository;
import com.gcf.spring.repository.TeacherRepository;

@SpringBootTest
@Transactional
@Rollback(false)
public class OnProgramIntegrationTest1 {

    @Autowired
    private OnProgramRepository onProgramRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Test
    public void testCreateAndSaveOnPrograms() {
        try {
            // Given
            // Member 엔티티 생성 및 저장
            Member member = new Member();
            member.setId("qweqwe9");
            member.setName("J456ohn Doe");
            member.setPassword(passwordEncoder.encode("password")); // 암호화된 비밀번호 설정	
            member.setBirth(LocalDate.of(1980, 1, 1));
            member.setPhone_number("010-1234-1278");
            member.setTel_number("02-123-4547");
            member.setEmail("jo545hn.d4o5e@example.com");
            member.setAddress("123 Street, City");
            member.setDetail_address("Apt 101");
            member.setEmail_agreement(true);
            member.setMessage_agreement(true);
            member.setMail_agreement(true);
            member.setMarried(false);
            member.setHasChildren(false);
            member.setRole(Role.USER);
            member.setCreatedAt(LocalDateTime.now());
            member = memberRepository.save(member);

            // Teacher 엔티티 생성 및 저장
            Teacher teacher = new Teacher();
            teacher.setMember(member); // Member와의 관계 설정
            teacher.setTeacher_category(Arrays.asList("Yoga", "Fitness"));
            teacher.setCareer("10 years experience in Yoga");
            teacher.setCareerStartYear("2010");
            teacher.setCareerEndYear("2020");
            teacher = teacherRepository.save(teacher);

            // 첫 번째 OnProgramDto 설정
            OnProgramDto onProgramDto1 = new OnProgramDto();
            onProgramDto1.setProgramName("온라인 요가 클래스");
            onProgramDto1.setMembers(Arrays.asList(member)); // Member 리스트 설정
            onProgramDto1.setTeacher(teacher);
            onProgramDto1.setOperatingStartDay(LocalDate.of(2024, 7, 1));
            onProgramDto1.setViews(0);
            onProgramDto1.setLikesCount(0);
            onProgramDto1.setCategory("교육");
            onProgramDto1.setProgramType("온라인");
            onProgramDto1.setApprovalState("승인대기");

            // 두 번째 OnProgramDto 설정
            OnProgramDto onProgramDto2 = new OnProgramDto();
            onProgramDto2.setProgramName("온라인 피트니스 클래스");
            onProgramDto2.setMembers(Arrays.asList(member)); // Member 리스트 설정
            onProgramDto2.setTeacher(teacher);
            onProgramDto2.setOperatingStartDay(LocalDate.of(2024, 8, 1));
            onProgramDto2.setViews(0);
            onProgramDto2.setLikesCount(0);
            onProgramDto2.setCategory("운동");
            onProgramDto2.setProgramType("온라인");
            onProgramDto2.setApprovalState("승인대기");

            // When
            OnProgram onProgram1 = OnProgram.createOnProgram(onProgramDto1);
            onProgram1 = onProgramRepository.save(onProgram1);

            OnProgram onProgram2 = OnProgram.createOnProgram(onProgramDto2);
            onProgram2 = onProgramRepository.save(onProgram2);

            // Then
            OnProgram found1 = onProgramRepository.findById(onProgram1.getId()).orElse(null);
            assertNotNull(found1);
            assertEquals("온라인 요가 클래스", found1.getProgramName());
            assertNotNull(found1.getTeacher());
            assertEquals(LocalDate.of(2024, 7, 1), found1.getOperatingStartDay());
            assertEquals(0, found1.getViews().intValue());
            assertEquals(0, found1.getLikesCount().intValue());
            assertEquals("교육", found1.getCategory());
            assertEquals("온라인", found1.getProgramType());
            assertEquals("승인대기", found1.getApprovalState());

            OnProgram found2 = onProgramRepository.findById(onProgram2.getId()).orElse(null);
            assertNotNull(found2);
            assertEquals("온라인 피트니스 클래스", found2.getProgramName());
            assertNotNull(found2.getTeacher());
            assertEquals(LocalDate.of(2024, 8, 1), found2.getOperatingStartDay());
            assertEquals(0, found2.getViews().intValue());
            assertEquals(0, found2.getLikesCount().intValue());
            assertEquals("운동", found2.getCategory());
            assertEquals("온라인", found2.getProgramType());
            assertEquals("승인대기", found2.getApprovalState());
        } catch (Exception e) {
            e.printStackTrace(); // 예외 로그 출력
        }
    }
}
