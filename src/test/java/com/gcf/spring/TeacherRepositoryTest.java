//package com.gcf.spring;
//
//import java.time.Year;
//import java.util.ArrayList;
//import java.util.List;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.test.annotation.Rollback;
//
//import com.gcf.spring.constant.Role;
//import com.gcf.spring.constant.Teacher_category;
//import com.gcf.spring.dto.TeacherDto;
//import com.gcf.spring.entity.Member;
//import com.gcf.spring.entity.Teacher;
//
//public class TeacherRepositoryTest {
//	@Test
//	@Transactional
//	@Rollback(false)
//	public void testInsertTeachersWithExistingMembers() {
//	    List<Teacher> teachers = new ArrayList<>();
//
//	    // 데이터베이스에서 기존 Member 엔티티 조회
//	    List<Member> existingMembers = memberRepository.findAll();
//
//	    // 기존 Member 엔티티를 활용하여 Teacher 엔티티 생성
//	    for (Member existingMember : existingMembers) {
//	        // 테스트 데이터 생성 (기존 Member 엔티티 속성 활용)
//	        TeacherDto teacherDto = new TeacherDto();
//	        teacherDto.setId(existingMember.getId()); // Member의 ID를 Teacher의 ID로 활용
//	        teacherDto.setName(existingMember.getName());
//	        teacherDto.setBirth(existingMember.getBirth());
//	        teacherDto.setPhone_number(existingMember.getPhone_number());
//	        teacherDto.setEmail(existingMember.getEmail());
//	        teacherDto.setAddress(existingMember.getAddress());
//	        teacherDto.setEmail_agreement(existingMember.isEmail_agreement());
//	        teacherDto.setMessage_agreement(existingMember.isMessage_agreement());
//	        teacherDto.setMail_agreement(existingMember.isMail_agreement());
//	        teacherDto.setInterests(existingMember.getInterests());
//	        teacherDto.setMarried(existingMember.isMarried());
//	        teacherDto.setHasChildren(existingMember.isHasChildren());
//
//	        // Teacher 엔티티 생성
//	        Teacher teacher = Teacher.createTeacher(teacherDto, passwordEncoder);
//	        teacher.setTeacher_category(Teacher_category.PRIMARY_SCHOOL); // Set teacher category
//	        teacher.setCarrer("Your career"); // Set career
//	        teacher.setCareer_Start_Year(Year.of(2000)); // Set career start year
//	        teacher.setCareer_End_Year(Year.of(2020)); // Set career end year
//	        teacher.setRole(Role.TEACHER); // Set role
//
//	        teachers.add(teacher);
//	    }
//
//	    // 생성된 Teacher 엔티티들을 한 번에 저장
//	    teacherRepository.saveAll(teachers);
//
//	    // 저장된 데이터 확인
//	    for (Teacher teacher : teachers) {
//	        String teacherId = teacher.getId();
//	        Teacher savedTeacher = teacherRepository.findById(teacherId).orElse(null);
//	        assert savedTeacher != null;
//	        // 필요한 경우 다른 필드도 확인할 수 있습니다.
//	    }
//	}
//}
