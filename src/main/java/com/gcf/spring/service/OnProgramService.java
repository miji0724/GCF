package com.gcf.spring.service;

import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.entity.ProgramInfo;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.repository.OnProgramRepository;
import com.gcf.spring.repository.ProgramInfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OnProgramService {

    @Autowired
    private OnProgramRepository onProgramRepository;
    
    @Autowired
    private ProgramInfoRepository programInfoRepository;

    public OnProgram createOnProgram(OnProgramDto onProgramDto, Teacher teacher) {
        OnProgram onProgram = OnProgram.createOnProgram(onProgramDto);
        onProgram.setTeacher(teacher); // Teacher 설정
        return onProgramRepository.save(onProgram);
    }

    public List<OnProgram> getAllOnPrograms() {
        return onProgramRepository.findAll();
    }

    public OnProgram getOnProgramById(Integer id) {
        return onProgramRepository.findById(id).orElse(null);
    }

	public List<ProgramInfo> insertProgramInfo(List<ProgramInfo> programInfos) {
		return programInfoRepository.saveAll(programInfos);
	}
}
