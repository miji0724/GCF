package com.gcf.spring.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.repository.OffProgramRepository;
import com.gcf.spring.repository.OnProgramRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProgramService {

	private final OffProgramRepository offProgramRepository;
    private final OnProgramRepository onProgramRepository;

 // VV 관리자 페이지에서 사용하는 메서드 영역 VV //

 	public List<OnProgramDto> getAllOnPrograms() {
 		List<OnProgram> approvedOnPrograms = onProgramRepository.findAllByApprovalState("승인");
 		List<OnProgramDto> approvedOnProgramsDTO = new ArrayList<>();
 		// 콘솔에 엔티티 및 속성을 출력합니다.
 		for (OnProgram program : approvedOnPrograms) {
 			OnProgramDto dto = new OnProgramDto();
 			dto = OnProgram.convertToOnProgramDto(program);
 			// 필요한 다른 속성들을 설정합니다.
 			approvedOnProgramsDTO.add(dto);
 		}
 		return approvedOnProgramsDTO;
 	}

 	public List<OffProgramDto> getAllOffPrograms() {
 		List<OffProgram> approvedOffPrograms = offProgramRepository.findAllByApprovalState("승인");
 		List<OffProgramDto> approvedOffProgramsDTO = new ArrayList<>();
 		for (OffProgram program : approvedOffPrograms) {
 			OffProgramDto dto = new OffProgramDto();
 			dto = OffProgram.convertToOffProgramDto(program);
 			// 필요한 다른 속성들을 설정합니다.
 			approvedOffProgramsDTO.add(dto);
 		}
 		return approvedOffProgramsDTO;
 	}

 	public List<OnProgramDto> getAllPendingApprovalOnPrograms() {
 		List<OnProgram> pendingApprovalOnPrograms = onProgramRepository.findAllByApprovalState("승인대기");
 		List<OnProgramDto> pendingApprovalOnProgramsDTO = new ArrayList<>();
 		for (OnProgram program : pendingApprovalOnPrograms) {
 			OnProgramDto dto = new OnProgramDto();
 			dto = OnProgram.convertToOnProgramDto(program);
 			// 필요한 다른 속성들을 설정합니다.
 			pendingApprovalOnProgramsDTO.add(dto);
 		}
 		return pendingApprovalOnProgramsDTO;
 	}

 	public List<OffProgramDto> getAllPendingApprovalOffPrograms() {
 		List<OffProgram> pendingApprovalOffPrograms = offProgramRepository.findAllByApprovalState("승인대기");
 		List<OffProgramDto> pendingApprovalOffProgramsDTO = new ArrayList<>();
 		for (OffProgram program : pendingApprovalOffPrograms) {
 			OffProgramDto dto = new OffProgramDto();
 			dto = OffProgram.convertToOffProgramDto(program);
 			pendingApprovalOffProgramsDTO.add(dto);
 		}
 		return pendingApprovalOffProgramsDTO;
 	}
 	
 	public List<OnProgramDto> getAllSearchOnPrograms(String searchType, String searchTerm) {
 		if (searchType.equals("lecture_name")) {
 			List<OnProgram> searchPendingApprovalOnPrograms = onProgramRepository.findByTeacherMemberNameContainingAndApprovalState(searchTerm,"승인");
 			List<OnProgramDto> searchPendingApprovalOnProgramsDTO = new ArrayList<>();
 			for (OnProgram program : searchPendingApprovalOnPrograms) {
 				OnProgramDto dto = new OnProgramDto();
 				dto = OnProgram.convertToOnProgramDto(program);
 				// 필요한 다른 속성들을 설정합니다.
 				searchPendingApprovalOnProgramsDTO.add(dto);
 			}
 			return searchPendingApprovalOnProgramsDTO;
 		} else if (searchType.equals("lecture_id")) {
 	    	List<OnProgram> searchPendingApprovalOnPrograms = onProgramRepository.findByTeacherIdContainingAndApprovalState(searchTerm,"승인");
 	    	List<OnProgramDto> searchPendingApprovalOnProgramsDTO = new ArrayList<>();
 			for (OnProgram program : searchPendingApprovalOnPrograms) {
 				OnProgramDto dto = new OnProgramDto();
 				dto = OnProgram.convertToOnProgramDto(program);
 				// 필요한 다른 속성들을 설정합니다.
 				searchPendingApprovalOnProgramsDTO.add(dto);
 			}
 			return searchPendingApprovalOnProgramsDTO;
 		}else {
 			return new ArrayList<>();
 		}
 	}

 	public List<OffProgramDto> getAllSearchOffPrograms(String searchType, String searchTerm) {
 		if (searchType.equals("lecture_name")) {
 			List<OffProgram> searchPendingApprovalOffPrograms = offProgramRepository.findByTeacherMemberNameContainingAndApprovalState(searchTerm,"승인");
 			List<OffProgramDto> searchPendingApprovalOffProgramsDTO = new ArrayList<>();
 			for (OffProgram program : searchPendingApprovalOffPrograms) {
 				OffProgramDto dto = new OffProgramDto();
 				dto = OffProgram.convertToOffProgramDto(program);
 				// 필요한 다른 속성들을 설정합니다.
 				searchPendingApprovalOffProgramsDTO.add(dto);
 			}
 			return searchPendingApprovalOffProgramsDTO;
 		} else if (searchType.equals("lecture_id")) {
 	    	List<OffProgram> searchPendingApprovalOffPrograms = offProgramRepository.findByTeacherIdContainingAndApprovalState(searchTerm,"승인");
 	    	List<OffProgramDto> searchPendingApprovalOffProgramsDTO = new ArrayList<>();
 			for (OffProgram program : searchPendingApprovalOffPrograms) {
 				OffProgramDto dto = new OffProgramDto();
 				dto = OffProgram.convertToOffProgramDto(program);
 				// 필요한 다른 속성들을 설정합니다.
 				searchPendingApprovalOffProgramsDTO.add(dto);
 			}
 			return searchPendingApprovalOffProgramsDTO;
 		}else {
 			return new ArrayList<>();
 		}
 	}
 	
 	public List<OnProgramDto> getAllSearchPendingApprovalOnPrograms(String searchType, String searchTerm) {
 		if (searchType.equals("lecApp_name")) {
 			List<OnProgram> searchPendingApprovalOnPrograms = onProgramRepository.findByTeacherMemberNameContainingAndApprovalState(searchTerm,"승인대기");
 			List<OnProgramDto> searchPendingApprovalOnProgramsDTO = new ArrayList<>();
 			for (OnProgram program : searchPendingApprovalOnPrograms) {
 				OnProgramDto dto = new OnProgramDto();
 				dto = OnProgram.convertToOnProgramDto(program);
 				// 필요한 다른 속성들을 설정합니다.
 				searchPendingApprovalOnProgramsDTO.add(dto);
 			}
 			return searchPendingApprovalOnProgramsDTO;
 		} else if (searchType.equals("lecApp_id")) {
 	    	List<OnProgram> searchPendingApprovalOnPrograms = onProgramRepository.findByTeacherIdContainingAndApprovalState(searchTerm,"승인대기");
 	    	List<OnProgramDto> searchPendingApprovalOnProgramsDTO = new ArrayList<>();
 			for (OnProgram program : searchPendingApprovalOnPrograms) {
 				OnProgramDto dto = new OnProgramDto();
 				dto = OnProgram.convertToOnProgramDto(program);
 				// 필요한 다른 속성들을 설정합니다.
 				searchPendingApprovalOnProgramsDTO.add(dto);
 			}
 			return searchPendingApprovalOnProgramsDTO;
 		}else {
 			return new ArrayList<>();
 		}
 	}

 	public List<OffProgramDto> getAllSearchPendingApprovalOffPrograms(String searchType, String searchTerm) {
 		if (searchType.equals("lecApp_name")) {
 			List<OffProgram> searchPendingApprovalOffPrograms = offProgramRepository.findByTeacherMemberNameContainingAndApprovalState(searchTerm,"승인대기");
 			List<OffProgramDto> searchPendingApprovalOffProgramsDTO = new ArrayList<>();
 			for (OffProgram program : searchPendingApprovalOffPrograms) {
 				OffProgramDto dto = new OffProgramDto();
 				dto = OffProgram.convertToOffProgramDto(program);
 				// 필요한 다른 속성들을 설정합니다.
 				searchPendingApprovalOffProgramsDTO.add(dto);
 			}
 			return searchPendingApprovalOffProgramsDTO;
 		} else if (searchType.equals("lecApp_id")) {
 	    	List<OffProgram> searchPendingApprovalOffPrograms = offProgramRepository.findByTeacherIdContainingAndApprovalState(searchTerm,"승인대기");
 	    	List<OffProgramDto> searchPendingApprovalOffProgramsDTO = new ArrayList<>();
 			for (OffProgram program : searchPendingApprovalOffPrograms) {
 				OffProgramDto dto = new OffProgramDto();
 				dto = OffProgram.convertToOffProgramDto(program);
 				// 필요한 다른 속성들을 설정합니다.
 				searchPendingApprovalOffProgramsDTO.add(dto);
 			}
 			return searchPendingApprovalOffProgramsDTO;
 		}else {
 			return new ArrayList<>();
 		}
 	}
 	
 	public boolean updateOnProgramStateApproval(Integer id) {
 		try {
 			OnProgram onProgram = null;
 			Optional<OnProgram> optionalProgram = onProgramRepository.findById(id);
 			
 			onProgram = optionalProgram.get();
 			
 			onProgram.setApprovalState("승인");
 			onProgramRepository.save(onProgram);
 			
 			return true;
 		} catch (Exception e) {
 			e.printStackTrace();
 			return false;
 		}
 	}

 	public boolean updateOnProgramStateNotApproval(Integer id) {
 		try {
 			OnProgram onProgram = null;
 			Optional<OnProgram> optionalProgram = onProgramRepository.findById(id);
 			
 			onProgram = optionalProgram.get();
 			
 			onProgram.setApprovalState("미승인");
 			onProgramRepository.save(onProgram);
 			
 			return true;
 		} catch (Exception e) {
 			e.printStackTrace();
 			return false;
 		}
 	}
 	
 	public boolean updateOffProgramStateApproval(Integer id) {
 		try {
 			OffProgram offProgram = null;
 			Optional<OffProgram> optionalProgram = offProgramRepository.findById(id);
 			
 			offProgram = optionalProgram.get();
 			
 			offProgram.setApprovalState("승인");
 			offProgramRepository.save(offProgram);
 			
 			return true;
 		} catch (Exception e) {
 			e.printStackTrace();
 			return false;
 		}
 	}

 	public boolean updateOffProgramStateNotApproval(Integer id) {
 		try {
 			OffProgram offProgram = null;
 			Optional<OffProgram> optionalProgram = offProgramRepository.findById(id);
 			
 			offProgram = optionalProgram.get();
 			
 			offProgram.setApprovalState("미승인");
 			offProgramRepository.save(offProgram);
 		
 			return true;
 		} catch (Exception e) {
 			e.printStackTrace();
 			return false;
 		}
 	}
 	
 	public void deleteOnProgramById(Integer id) {
 		onProgramRepository.deleteById(id);
 	}
 	
 	public void deleteOffProgramById(Integer id) {
 		offProgramRepository.deleteById(id);
 	}
    
 	// 메인 홈 오프라인 // 
 	
    // 조회수가 높은 4개 프로그램 조회
    public List<OffProgram> getTop4ProgramsOrderByViews() {
        return offProgramRepository.findTop4ByApprovalStateOrderByViewsDesc("승인");
    }
    
    // 최신순으로 4개 프로그램 조회
    public List<OffProgram> getTop4ProgramsOrderByNew() {
        return offProgramRepository.findTop4ByApprovalStateOrderByApplicationStartDateDesc("승인");
    }
    
    // 이달의 일정 오프라인 //
    public List<OffProgram> getAllOffProgram() {
    	return offProgramRepository.findAll();
    }
    
    
    // 메인 홈 온라인 // 
    
    // 조회수가 높은 4개 프로그램 조회
    public List<OnProgram> getTop4OnProgramsOrderByViews() {
        return onProgramRepository.findTop4ByApprovalStateOrderByViewsDesc("승인");
    }
    
    // 최신순으로 4개 프로그램 조회
    public List<OnProgram> getTop4OnProgramsOrderByNew() {
        return onProgramRepository.findTop4ByApprovalStateOrderByOperatingStartDayDesc("승인");
    }
    

}