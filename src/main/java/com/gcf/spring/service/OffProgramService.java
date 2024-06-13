package com.gcf.spring.service;

import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.repository.OffProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OffProgramService {

    @Autowired
    private OffProgramRepository offProgramRepository;

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
    
    
}
 