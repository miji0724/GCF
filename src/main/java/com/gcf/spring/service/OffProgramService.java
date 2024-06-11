package com.gcf.spring.service;

import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.repository.OffProgramRepository;
import com.gcf.spring.repository.TeacherInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OffProgramService {

    @Autowired
    private OffProgramRepository offProgramRepository;

    @Autowired
    private TeacherInfoRepository teacherInfoRepository;

    public OffProgram createOffProgram(OffProgramDto offProgramDto, Teacher teacher) {
        OffProgram offProgram = OffProgram.createOffProgram(offProgramDto);
        offProgram.setTeacher(teacher);
        offProgram.setTeacherInfos(teacherInfoRepository.findByTeacher(teacher));
        return offProgramRepository.save(offProgram);
    }

    public List<OffProgram> getAllOffPrograms() {
        return offProgramRepository.findAll();
    }
}
