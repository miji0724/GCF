package com.gcf.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.entity.OnVideo;
import com.gcf.spring.entity.ProgramInfo;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.entity.TeacherInfo;
import com.gcf.spring.repository.OnProgramRepository;
import com.gcf.spring.repository.OnVideoRepository;
import com.gcf.spring.repository.ProgramInfoRepository;
import com.gcf.spring.repository.TeacherInfoRepository;

@Service
public class OnProgramService {

    @Autowired
    private OnProgramRepository onProgramRepository;
    
    @Autowired
    private ProgramInfoRepository programInfoRepository;
    
    @Autowired
    private TeacherInfoRepository teacherInfoRepository;
    
    @Autowired
    private OnVideoRepository onVideoRepository;

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
	
	public List<TeacherInfo> insertTeacherInfo(List<TeacherInfo> teacherInfos) {
		return teacherInfoRepository.saveAll(teacherInfos);
	}
	
	public List<OnVideo> insertOnVideo(List<OnVideo> onVideos) {
		return onVideoRepository.saveAll(onVideos);
	}
}