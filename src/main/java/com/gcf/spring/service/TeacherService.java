package com.gcf.spring.service;

import com.gcf.spring.dto.TeacherDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final MemberRepository memberRepository;

    // 강사 신청
    public Teacher applyForTeacher(TeacherDto teacherDto) {
        // 회원 정보 확인
        Member member = memberRepository.findById(teacherDto.getId())
                .orElseThrow(() -> new IllegalArgumentException("회원 정보를 찾을 수 없습니다."));

        // Teacher 엔티티 생성 및 설정
        Teacher teacher = new Teacher();
        teacher.setMember(member);
        teacher.setId(teacherDto.getId());
        teacher.setAffiliatedOrganization(teacherDto.getAffiliatedOrganization());
        teacher.setTeacher_category(teacherDto.getTeacherCategory());
        teacher.setSnsAddress(teacherDto.getSnsAddress());
        teacher.setCarrer(teacherDto.getCareer());
        teacher.setCareerStartYear(teacherDto.getCareerStartYear());
        teacher.setCareerEndYear(teacherDto.getCareerEndYear());
        teacher.setLicenseName(teacherDto.getLicenseName());

        // 저장
        return teacherRepository.save(teacher);
    }
}
