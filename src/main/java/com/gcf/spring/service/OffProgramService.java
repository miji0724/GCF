package com.gcf.spring.service;

import java.time.LocalDate;
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
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.ProgramInfo;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.entity.TeacherInfo;
import com.gcf.spring.repository.AttachmentRepository;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.repository.OffProgramRepository;
import com.gcf.spring.repository.ProgramInfoRepository;
import com.gcf.spring.repository.TeacherInfoRepository;
import com.gcf.spring.specification.OffProgramSpecification;

@Service
public class OffProgramService {

    @Autowired
    private OffProgramRepository offProgramRepository;
    
    @Autowired
    private ProgramInfoRepository programInfoRepository;
    
    @Autowired
    private TeacherInfoRepository teacherInfoRepository;
    
    @Autowired
    private AttachmentRepository attachmentRepository;
    
    @Autowired
    private MemberRepository memberRepository;
    

    private final ModelMapper modelMapper;

    public OffProgram createOffProgram(OffProgramDto offProgramDto, Teacher teacher) {
        OffProgram offProgram = OffProgram.createOffProgram(offProgramDto);
        System.out.println("teacher : "+teacher);
        
        offProgram.setTeacher(teacher); // Teacher 설정
        
        Optional<Attachment> optionalAttachment = attachmentRepository.findById(offProgramDto.getPosterId());
        if (optionalAttachment.isPresent()) {
			Attachment attachment = optionalAttachment.get();
			offProgram.setPoster(attachment);
		}
        System.out.println("offProgramDto : "+offProgramDto);
        
        return offProgramRepository.save(offProgram);
    }


    public List<OffProgram> getAllOffPrograms() {
        return offProgramRepository.findAll();
    }

    public OffProgram getOffProgramById(Integer id) {
        return offProgramRepository.findById(id).orElse(null);
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
    
    public List<OffProgram> getOffProgramsByUserId(String userId) {
        return offProgramRepository.findByMemberId(userId);
    }
    @Autowired
    public OffProgramService(OffProgramRepository offProgramRepository, ModelMapper modelMapper) {
        this.offProgramRepository = offProgramRepository;
        this.modelMapper = modelMapper;
    }
    
    //페이지네이션 기능 
    public Page<OffProgramDto> getAllPrograms(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OffProgram> programsPage = offProgramRepository.findAll(pageable);
        List<OffProgramDto> programDtos = programsPage.stream()
                .map(program -> modelMapper.map(program, OffProgramDto.class))
                .collect(Collectors.toList());
        return new PageImpl<>(programDtos, pageable, programsPage.getTotalElements());
    }

    //ID로 강의 조회 (DTO 반환)
    public Optional<OffProgramDto> getProgramById(int id) {
        Optional<OffProgram> program = offProgramRepository.findById(id);
        return program.map(p -> modelMapper.map(p, OffProgramDto.class));
    }

    // 필터 박스 및 페이지네이션 기능 
    public Page<OffProgramDto> getFilteredPrograms(String state, String placeName, String category, String date, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(
                Sort.Order.desc("applicationState"),
                Sort.Order.desc("operatingStartDay")
        )); // 강의 마감 상태인 강의는 뒤로 가게
        
        LocalDate parsedDate = date != null ? LocalDate.parse(date) : null;

        Specification<OffProgram> spec = Specification.where(OffProgramSpecification.hasState(state))
                .and(OffProgramSpecification.hasPlaceName(placeName))
                .and(OffProgramSpecification.hasCategory(category))
                .and(OffProgramSpecification.hasOperatingDate(parsedDate));

        Page<OffProgram> filteredPrograms = offProgramRepository.findAll(spec, pageable);

        List<OffProgramDto> programDtos = filteredPrograms.stream()
                .map(program -> modelMapper.map(program, OffProgramDto.class))
                .collect(Collectors.toList());
        
        return new PageImpl<>(programDtos, pageable, filteredPrograms.getTotalElements());
    }

    // 프로그램 상태 업데이트
    public boolean updateProgramStats(Integer id, boolean incrementViews, boolean incrementLikes) {
        Optional<OffProgram> offProgramOpt = offProgramRepository.findById(id);
        if (offProgramOpt.isPresent()) {
            OffProgram offProgram = offProgramOpt.get();
            if (incrementViews) {
                offProgram.setViews(offProgram.getViews() + 1);
            }
            if (incrementLikes) {
                offProgram.setLikesCount(offProgram.getLikesCount() + 1);
            }
            offProgramRepository.save(offProgram);
            return true;
        } else {
            return false;
        }
    }

    
    // state 접수 기간 중에는 접수중 그 외에는 접수마감 
    private void updateApplicationState(OffProgram offProgram) {
        LocalDate currentDate = LocalDate.now();
        if (!currentDate.isBefore(offProgram.getApplicationStartDate())
                && !currentDate.isAfter(offProgram.getApplicationEndDate())) {
            offProgram.setApplicationState("접수중");
        } else {
            offProgram.setApplicationState("접수마감");
        }
    }

    // 포스터를 클릭 시 프로그램 이름으로 페이지가 넘어감,  offprogram/오프라인 축제
    public Optional<OffProgramDto> getProgramByName(String programName) {
        Optional<OffProgram> program = offProgramRepository.findByProgramName(programName);
        return program.map(p -> modelMapper.map(p, OffProgramDto.class));
    }
    
//    //프로그램 신청 시 인원 증가 
//    public boolean incrementParticipants(Integer id) {
//        Optional<OffProgram> offProgramOpt = offProgramRepository.findById(id);
//        if (offProgramOpt.isPresent()) {
//            OffProgram offProgram = offProgramOpt.get();
//            if (offProgram.getCurrentParticipants() < offProgram.getMaxParticipants()) {
//                offProgram.setCurrentParticipants(offProgram.getCurrentParticipants() + 1);
//                offProgramRepository.save(offProgram);
//                return true;
//            }
//        }
//        return incrementParticipants(id);
//    }
//
//    public void updateApplicationOffProgram(Integer id, String userId) {
//    	Optional<OffProgram> program = offProgramRepository.findById(id);
//    	
//    }
    
    
    public boolean incrementParticipants(Integer id, String userId) {
        return updateApplicationOffProgram(id, userId);
    }

    public boolean updateApplicationOffProgram(Integer id, String userId) {
        Optional<OffProgram> programOptional = offProgramRepository.findById(id);

        if (programOptional.isPresent()) {
            OffProgram program = programOptional.get();
            Optional<Member> memberOptional = memberRepository.findById(userId);
            
            if (memberOptional.isPresent()) {
                Member member = memberOptional.get();
                program.setMember(member); // Member 객체를 설정합니다.
                offProgramRepository.save(program);
                return true;
            } else {
                return false; // 사용자 ID에 해당하는 멤버가 없는 경우
            }
        } else {
            return false; // 프로그램 ID에 해당하는 프로그램이 없는 경우
        }
    }

    
} 