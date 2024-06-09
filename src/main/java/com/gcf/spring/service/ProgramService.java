package com.gcf.spring.service;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<OnProgram> getAllApprovedOnPrograms() {
        List<OnProgram> approvedOnPrograms = onProgramRepository.findAllByApprovalState("승인");
        // 승인된 온라인 프로그램의 강사 이름 설정
        for (OnProgram onProgram : approvedOnPrograms) {
            setTeacherName(onProgram);
        }
        return approvedOnPrograms;
    }

    public List<OffProgram> getAllApprovedOffPrograms() {
        List<OffProgram> approvedOffPrograms = offProgramRepository.findAllByApprovalState("승인");
        // 승인된 오프라인 프로그램의 강사 이름 설정
        for (OffProgram offProgram : approvedOffPrograms) {
            setTeacherName(offProgram);
        }
        return approvedOffPrograms;
    }

    public List<OnProgram> getAllPendingApprovalOnPrograms() {
        return onProgramRepository.findAllByApprovalState("승인대기")
                .stream()
                .peek(this::setTeacherName) // 각 프로그램의 강사 이름 설정
                .collect(Collectors.toList());
    }

    public List<OffProgram> getAllPendingApprovalOffPrograms() {
        return offProgramRepository.findAllByApprovalState("승인대기")
                .stream()
                .peek(this::setTeacherName) // 각 프로그램의 강사 이름 설정
                .collect(Collectors.toList());
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
