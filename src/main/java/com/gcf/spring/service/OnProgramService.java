package com.gcf.spring.service;

import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.repository.OnProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OnProgramService {

    @Autowired
    private OnProgramRepository onProgramRepository;

    public OnProgram createOnProgram(OnProgramDto onProgramDto, Teacher teacher) {
        OnProgram onProgram = OnProgram.createOnProgram(onProgramDto);
        onProgram.setTeacher(teacher); // Teacher 설정
        return onProgramRepository.save(onProgram);
    }

    public List<OnProgram> getAllOnPrograms() {
        return onProgramRepository.findAll();
    }
}
