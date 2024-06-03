package com.gcf.spring.service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcf.spring.constant.Role;
import com.gcf.spring.dto.TeacherDTO;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.repository.TeacherRepository;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository, MemberRepository memberRepository, ModelMapper modelMapper) {
        this.teacherRepository = teacherRepository;
        this.memberRepository = memberRepository;
        this.modelMapper = modelMapper;
    }

    public List<TeacherDTO> getAllTeachers() {
        List<Teacher> teachers = teacherRepository.findAll();
        return teachers.stream()
                .map(teacher -> modelMapper.map(teacher, TeacherDTO.class))
                .collect(Collectors.toList());
    }

    public Optional<TeacherDTO> getTeacherById(String id) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        return teacher.map(t -> modelMapper.map(t, TeacherDTO.class));
    }

    public TeacherDTO saveTeacher(TeacherDTO teacherDTO) {
        // Member 조회 및 검증
        Member member = memberRepository.findById(teacherDTO.getId())
                .orElseThrow(() -> new RuntimeException("Member not found"));
        member.setRole(Role.TEACHER);

        // Teacher 엔티티 생성 및 설정
        Teacher teacher = modelMapper.map(teacherDTO, Teacher.class);
        teacher.setMember(member);

        Teacher savedTeacher = teacherRepository.save(teacher);
        return modelMapper.map(savedTeacher, TeacherDTO.class);
    }

    public boolean updateTeacherStats(String id, String carrer, String careerStartYear, String careerEndYear, String affiliatedOrganization, String licenseCode) {
        Optional<Teacher> optionalTeacher = teacherRepository.findById(id);
        if (optionalTeacher.isPresent()) {
            Teacher teacher = optionalTeacher.get();
            teacher.setCarrer(carrer);
            teacher.setCareerStartYear(careerStartYear);
            teacher.setCareerEndYear(careerEndYear);
            teacher.setAffiliatedOrganization(affiliatedOrganization);
            teacher.setLicenseName(licenseCode);
            teacherRepository.save(teacher);
            return true;
        } else {
            return false;
        }
    }
}
