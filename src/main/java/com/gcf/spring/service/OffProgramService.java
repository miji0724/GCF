package com.gcf.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.ProgramInfo;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.entity.TeacherInfo;
import com.gcf.spring.repository.OffProgramRepository;
import com.gcf.spring.repository.ProgramInfoRepository;
import com.gcf.spring.repository.TeacherInfoRepository;

@Service
public class OffProgramService {

    @Autowired
    private OffProgramRepository offProgramRepository;
    
    @Autowired
    private ProgramInfoRepository programInfoRepository;
    
    @Autowired
    private TeacherInfoRepository teacherInfoRepository;

    public OffProgram createOffProgram(OffProgramDto offProgramDto, Teacher teacher) {
        OffProgram offProgram = OffProgram.createOffProgram(offProgramDto);
        offProgram.setTeacher(teacher); // Teacher 설정
        return offProgramRepository.save(offProgram);
    }

    public List<OffProgram> getAllOffPrograms() {
        return offProgramRepository.findAll();
    }

    public OffProgram getOffProgramById(Integer id) {
        return offProgramRepository.findById(id).orElse(null);
    }
    
    public List<OffProgram> getOffProgramsByUserId(String userId) {
        return offProgramRepository.findByMemberId(userId);
    }
    
    public List<ProgramInfo> insertProgramInfo(List<ProgramInfo> programInfos) {
      return programInfoRepository.saveAll(programInfos);
   }
    
    public List<TeacherInfo> insertTeacherInfo(List<TeacherInfo> teacherInfos) {
       return teacherInfoRepository.saveAll(teacherInfos);
    }

   

}
 