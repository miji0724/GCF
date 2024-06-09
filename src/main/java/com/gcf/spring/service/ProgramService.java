package com.gcf.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.repository.OffProgramRepository;
import com.gcf.spring.repository.OnProgramRepository;

@Service
public class ProgramService {

    @Autowired
    private OnProgramRepository onProgramRepository;

    @Autowired
    private OffProgramRepository offProgramRepository;

    public List<OnProgram> getAllOnPrograms() {
        List<OnProgram> onPrograms = onProgramRepository.findAll();
        // 온라인 프로그램의 강사 이름 설정
        for (OnProgram onProgram : onPrograms) {
            setTeacherName(onProgram);
        }
        return onPrograms;
    }

    public List<OffProgram> getAllOffPrograms() {
        List<OffProgram> offPrograms = offProgramRepository.findAll();
        // 오프라인 프로그램의 강사 이름 설정
        for (OffProgram offProgram : offPrograms) {
            setTeacherName(offProgram);
        }
        return offPrograms;
    }

    private void setTeacherName(OnProgram onProgram) {
        Teacher teacher = onProgram.getTeacher();
        if (teacher != null && teacher.getMember() != null) {
            String teacherName = teacher.getMember().getName();
            onProgram.setTeacherName(teacherName);
        }
    }

    private void setTeacherName(OffProgram offProgram) {
        Teacher teacher = offProgram.getTeacher();
        if (teacher != null && teacher.getMember() != null) {
            String teacherName = teacher.getMember().getName();
            offProgram.setTeacherName(teacherName);
        }
    }
}
