package com.gcf.spring.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.gcf.spring.constant.Role;
import com.gcf.spring.constant.TeacherState;
import com.gcf.spring.dto.MemTeachDto;
import com.gcf.spring.dto.TeacherDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.repository.TeacherRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TeacherService {

	@Autowired
	private final TeacherRepository teacherRepository;

	@Autowired
	private final MemberRepository memberRepository;

	private static final Logger logger = LoggerFactory.getLogger(TeacherService.class);

	// 강사 신청
	public ResponseEntity<String> applyForTeacher(TeacherDto teacherDto) {
		try {

			// 저장
			logger.info("강사 정보: {}", teacherDto.toString());

			// 회원 정보 확인
			Member member = memberRepository.findById(teacherDto.getId())
					.orElseThrow(() -> new IllegalArgumentException("회원 정보를 찾을 수 없습니다."));

			// Teacher 엔티티 생성 및 설정
			Teacher teacher = new Teacher();
			teacher.setMember(member);
			teacher.setAffiliatedOrganization(teacherDto.getAffiliatedOrganization());
			teacher.setTeacher_category(teacherDto.getTeacherCategory());
			teacher.setSnsAddress(teacherDto.getSnsAddress());
			teacher.setCareer(teacherDto.getCareer());
			teacher.setCareerStartYear(teacherDto.getCareerStartYear());
			teacher.setCareerEndYear(teacherDto.getCareerEndYear());
			teacher.setLicenseName(teacherDto.getLicenseName());

			// 회원 정보를 데이터베이스에 저장
			teacherRepository.save(teacher);
			return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 중 오류가 발생했습니다");
		}
	}

	// VV 관리자 페이지에서 사용하는 메서드 영역 VV //

	public List<MemTeachDto> getTeachersWithPendingApproval() {
		TeacherState state = TeacherState.승인대기;
		return teacherRepository.findByTeacherState(state).stream().map(MemTeachDto::createMemTeachDto)
				.collect(Collectors.toList());
	}

	public List<MemTeachDto> getTeachersWithApproved() {
		TeacherState state = TeacherState.승인;
		return teacherRepository.findByTeacherState(state).stream().map(MemTeachDto::createMemTeachDto)
				.collect(Collectors.toList());
	}

	public boolean updateTeacherStateApproval(String id) {
		try {
			// 요청으로 받은 아이디로 강사 정보를 찾아옵니다.
			Teacher teacher = teacherRepository.findTeacherById(id);
			TeacherState newState = TeacherState.승인;

			Member member = teacher.getMember();
			member.setRole(Role.TEACHER);

			// 강사 정보의 상태를 업데이트합니다.
			teacher.setTeacherState(newState);
			teacherRepository.save(teacher);
			
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean updateTeacherStateNotApproval(String id) {
		try {
			// 요청으로 받은 아이디로 강사 정보를 찾아옵니다.
			Teacher teacher = teacherRepository.findTeacherById(id);

			TeacherState newState = TeacherState.미승인;

			if (teacher != null) {
				// 강사 정보의 상태를 업데이트합니다.
				teacher.setTeacherState(newState);
				teacherRepository.save(teacher);
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public Teacher saveTeacher(MemTeachDto memTeachDto) {
		// 기존에 등록된 강사인지 확인
		Optional<Teacher> existingTeacherOptional = teacherRepository.findById(memTeachDto.getId());
		if (existingTeacherOptional.isPresent()) {
			Teacher existingTeacher = existingTeacherOptional.get();
			// 새로운 정보로 기존 강사 정보 업데이트
			existingTeacher.setCareer(memTeachDto.getCareer());
			existingTeacher.setCareerStartYear(memTeachDto.getCareerStartYear());
			existingTeacher.setCareerEndYear(memTeachDto.getCareerEndYear());
			existingTeacher.setSnsAddress(memTeachDto.getSnsAddress());
			existingTeacher.setAffiliatedOrganization(memTeachDto.getAffiliatedOrganization());
			existingTeacher.setLicenseName(memTeachDto.getLicenseName());
			existingTeacher.setTeachAbleCategory(memTeachDto.getTeachAbleCategory());
			existingTeacher.setTeacher_category(memTeachDto.getTeacherCategory());
			existingTeacher.setTeacherState(TeacherState.승인); // 기본 값 설정

			// 회원 정보 업데이트
			Member member = existingTeacher.getMember();
			member.setName(memTeachDto.getName());
			member.setBirth(memTeachDto.getBirth());
			member.setPhone_number(memTeachDto.getPhone_number());
			member.setTel_number(memTeachDto.getTel_number());
			member.setEmail(memTeachDto.getEmail());
			member.setAddress(memTeachDto.getAddress());
			member.setDetail_address(memTeachDto.getDetail_address());

			return teacherRepository.save(existingTeacher);
		} else {
			// 기존에 등록된 강사가 없으면 수정할 수 없음
			throw new IllegalArgumentException("해당 ID를 가진 강사가 존재하지 않습니다.");
		}
	}

	public void deleteTeacherById(String id) {
		Optional<Teacher> existingTeacherOptional = teacherRepository.findById(id);
		Teacher existingTeacher = existingTeacherOptional.get();
		Member member = existingTeacher.getMember();
		member.setRole(Role.USER);

		System.out.println(member.toString());

		teacherRepository.deleteById(id);
	}
}