package com.gcf.spring.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.entity.OnVideo;
import com.gcf.spring.entity.ProgramInfo;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.entity.TeacherInfo;
import com.gcf.spring.repository.AttachmentRepository;
import com.gcf.spring.repository.MemberRepository;
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
    
    @Autowired
	private AttachmentRepository attachmentRepository;
    
    @Autowired
    private MemberRepository memberRepository;
    
    private final ModelMapper modelMapper;

    public OnProgram createOnProgram(OnProgramDto onProgramDto, Teacher teacher) {
		OnProgram onProgram = OnProgram.createOnProgram(onProgramDto);
		onProgram.setTeacher(teacher); // Teacher 설정
		System.out.println(" -posterID: " + onProgramDto.getPosterId());
		Optional<Attachment> optionalAttachment = attachmentRepository.findById(onProgramDto.getPosterId());
		if (optionalAttachment.isPresent()) {
			Attachment attachment = optionalAttachment.get();
			onProgram.setPoster(attachment);
			System.out.println(" -pp Original Name: " + attachment.getOriginal_name());
			System.out.println(" - File Name: " + attachment.getFile_name());
			System.out.println(" - File Path: " + attachment.getFile_path());
			System.out.println(" - Parent: " + attachment.getParent());
			System.out.println(" - ID: " + attachment.getId()); // 예시로 ID 출력
		}

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
	
	public Attachment insertPoster(Attachment poster) {
		return attachmentRepository.save(poster);
	}
	
	public List<OnVideo> insertOnVideo(List<OnVideo> onVideos) {
		return onVideoRepository.saveAll(onVideos);
	}
	
	 @Autowired
	    public OnProgramService(OnProgramRepository OnProgramRepository, ModelMapper modelMapper) {
	        this.onProgramRepository = OnProgramRepository;
	        this.modelMapper = modelMapper;
	    }
	    
	    //페이지네이션 기능 
	    public Page<OnProgramDto> getAllPrograms(int page, int size) {
	        Pageable pageable = PageRequest.of(page, size);
	        Page<OnProgram> programsPage = onProgramRepository.findAll(pageable);
	        List<OnProgramDto> programDtos = programsPage.stream()
	                .map(program -> modelMapper.map(program, OnProgramDto.class))
	                .collect(Collectors.toList());
	        return new PageImpl<>(programDtos, pageable, programsPage.getTotalElements());
	    }
	    
	 // 페이지네이션 및 카테고리 필터링 기능
	    public Page<OnProgramDto> getFilteredPrograms(String category, int page, int size) {
	        Pageable pageable = PageRequest.of(page, size, Sort.by(
	                Sort.Order.desc("operatingStartDay") // 최신 업로드 날짜 순으로 정렬
	        ));

	        Page<OnProgram> filteredPrograms = onProgramRepository.findByCategoryContaining(category, pageable);

	        List<OnProgramDto> programDtos = filteredPrograms.stream()
	                .map(program -> modelMapper.map(program, OnProgramDto.class))
	                .collect(Collectors.toList());

	        return new PageImpl<>(programDtos, pageable, filteredPrograms.getTotalElements());
	    }

	    
	    
	    // 프로그램 상태 업데이트
	    public boolean updateProgramStats(Integer id, boolean incrementViews, boolean incrementLikes) {
	        Optional<OnProgram> OnProgramOpt = onProgramRepository.findById(id);
	        if (OnProgramOpt.isPresent()) {
	            OnProgram OnProgram = OnProgramOpt.get();
	            if (incrementViews) {
	                OnProgram.setViews(OnProgram.getViews() + 1);
	            }
	            if (incrementLikes) {
	                OnProgram.setLikesCount(OnProgram.getLikesCount() + 1);
	            }
	            onProgramRepository.save(OnProgram);
	            return true;
	        } else {
	            return false;
	        }
	    }
	    
	    //ID로 강의 조회 (DTO 반환)
	    public Optional<OnProgramDto> getProgramById(int id) {
	        Optional<OnProgram> program = onProgramRepository.findById(id);
	        return program.map(p -> modelMapper.map(p, OnProgramDto.class));
	    }

}