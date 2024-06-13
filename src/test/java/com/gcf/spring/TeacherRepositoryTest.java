package com.gcf.spring;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;

import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.repository.TeacherRepository;

import jakarta.transaction.Transactional;

@SpringBootTest
public class TeacherRepositoryTest {
    
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private TeacherRepository teacherRepository;

    @Test
    @Transactional
    @Rollback(false)
    public void testInsertTeachersWithExistingMembers() {
        try {
            // 모든 Member 엔티티를 조회
            List<Member> members = memberRepository.findAll();
            
            // Teacher 엔티티 생성 및 필드 설정
            List<Teacher> teachers = new ArrayList<>();
            for (Member member : members) {
                Teacher teacher = new Teacher();
                teacher.setMember(member); // 기존 회원 연결
                teacher.setAffiliatedOrganization("중앙능력개발원");

                List<String> teacherCategories = new ArrayList<>();
                teacherCategories.add("기타");
                teacher.setTeacher_category(teacherCategories);

                teacher.setSnsAddress("Instagram/joong");
                teacher.setCareer("주요 이력1,주요 이력2,주요 이력3");
                teacher.setCareerStartYear("2020,2021,2022");
                teacher.setCareerEndYear("2023,2023,2024");
                teacher.setLicenseName("자격증1,자격증2,자격증3");
                teacher.setTeachAbleCategory("가능 분야1,가능 분야2,가능 분야3");

                teachers.add(teacher);
            }

            // Teacher 엔티티 저장
            teacherRepository.saveAll(teachers);

            // 저장된 Teacher 엔티티 검증
            for (Teacher teacher : teachers) {
                String teacherId = teacher.getId();
                Teacher savedTeacher = teacherRepository.findById(teacherId).orElse(null);
                assert savedTeacher != null;
                // 필요한 경우 다른 필드 검증 코드 추가
            }
        } catch (Exception e) {
            // 예외 발생 시 트랜잭션을 롤백하지 않도록 설정
            e.printStackTrace();
        }
    }
}