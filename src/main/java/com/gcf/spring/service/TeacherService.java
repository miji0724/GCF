package com.gcf.spring.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.gcf.spring.constant.TeacherState;
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
            teacher.setTeachAbleCategory(teacherDto.getTeachAbleCategory());

            // 회원 정보를 데이터베이스에 저장
            teacherRepository.save(teacher);
            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 중 오류가 발생했습니다");
        }
    }

    // 강사 정보 조회
    public TeacherDto getTeacherInfo(String userId) {
        Teacher teacher = teacherRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("강사 정보를 찾을 수 없습니다."));

        TeacherDto teacherDto = new TeacherDto();
        teacherDto.setAffiliatedOrganization(teacher.getAffiliatedOrganization());
        teacherDto.setTeacherCategory(teacher.getTeacher_category());
        teacherDto.setSnsAddress(teacher.getSnsAddress());
        teacherDto.setCareer(teacher.getCareer());
        teacherDto.setCareerStartYear(teacher.getCareerStartYear());
        teacherDto.setCareerEndYear(teacher.getCareerEndYear());
        teacherDto.setLicenseName(teacher.getLicenseName());
        teacherDto.setTeachAbleCategory(teacher.getTeachAbleCategory());

        return teacherDto;
    }
    
    // 강사 정보 업데이트
    public void updateTeacherInfo(String id, TeacherDto teacherDto) {
    	Teacher teacher = teacherRepository.findById(id)
    			.orElseThrow(() -> new IllegalArgumentException("강사 정보를 찾을 수 없습니다."));
    	
    	teacher.setAffiliatedOrganization(teacherDto.getAffiliatedOrganization());
        teacher.setTeacher_category(teacherDto.getTeacherCategory());
        teacher.setSnsAddress(teacherDto.getSnsAddress());
        teacher.setCareer(teacherDto.getCareer());
        teacher.setCareerStartYear(teacherDto.getCareerStartYear());
        teacher.setCareerEndYear(teacherDto.getCareerEndYear());
        teacher.setLicenseName(teacherDto.getLicenseName());
        teacher.setTeachAbleCategory(teacherDto.getTeachAbleCategory());

        teacherRepository.save(teacher);
    }
    
 // 강사 정보 삭제
    public void deleteTeacherInfo(String id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("강사 정보를 찾을 수 없습니다."));

        teacherRepository.delete(teacher); 
    }
    
    public Teacher findById(String id) {
        return teacherRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid teacher Id: " + id));
    }
    
    public TeacherState getTeacherStatus(String teacherId) {
        Teacher teacher = teacherRepository.findTeacherById(teacherId);
        if (teacher != null) {
            return teacher.getTeacherState(); // Teacher 엔티티에서 teacherstatus 가져오기
        }
        // 예외 처리나 기본값 반환 등 필요한 로직 추가
        return null; // 예시로 null 반환 (실제 상황에 따라 적절히 처리)
    }
}