package com.gcf.spring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

	private final TeacherRepository teacherRepository;
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
	        return teacherRepository.findByTeacherState(state)
	                .stream()
	                .map(MemTeachDto::createMemTeachDto)
	                .collect(Collectors.toList());
	    }
	 
	  public boolean updateTeacherState(String id) {
	        try {
	            // 요청으로 받은 아이디로 강사 정보를 찾아옵니다.
	            Teacher teacher = teacherRepository.findTeacherById(id);

	            TeacherState newState = TeacherState.승인;
	            
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
}