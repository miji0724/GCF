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
	public void testInsertTeachersWithExistingMembers(MemberRepository memberRepository, TeacherRepository teacherRepository, PasswordEncoder passwordEncoder) {
		// 1. 모의 데이터 생성 (없음)
        // 테스트 코드 내에서 필요한 만큼의 Member 데이터를 생성

        // 2. Teacher 생성 및 필드 설정
        List<Teacher> teachers = new ArrayList<>();
        // 기존 회원 데이터가 없을 경우 예시 코드 제공
        if (memberRepository.count() == 0) {
            // 필요한 만큼 Member 데이터 생성 (생략)
            List<Member> members = createMemberData(2);
            memberRepository.saveAll(members);
        }

        List<Member> members = memberRepository.findAll();
        for (Member member : members) {
            Teacher teacher = new Teacher();
            teacher.setMember(member); // 기존 회원 연결
            teacher.setAffiliatedOrganization("중앙능력개발원");
            List<String> teacherCategories = new ArrayList<>();
            teacherCategories.add("기타");
            teacher.setTeacher_category(teacherCategories);
            teacher.setSnsAddress("Instagram/joong");
            // 경력, 자격증, 가능 분야는 콤마(,)로 구분된 문자열을 저장하는 것이 일반적이지 않음
            // 별도의 리스트를 사용하는 것이 좋습니다. (예시 코드 제공)
            teacher.setCareer("주요 이력1,주요 이력2");
            teacher.setLicenseName("자격증1,자격증2,자격증3");
            teacher.setTeachAbleCategory("가능 분야1, 가능 분야2");
            teachers.add(teacher);
        }

	    // 4. 저장
	    teacherRepository.saveAll(teachers);

	    // 5. 검증
	    for (Teacher teacher : teachers) {
	        String teacherId = teacher.getId();
	        Teacher savedTeacher = teacherRepository.findById(teacherId).orElse(null);
	        assert savedTeacher != null;
	        // 필요한 경우 다른 필드 검증 코드 추가
	    }
	}
}
