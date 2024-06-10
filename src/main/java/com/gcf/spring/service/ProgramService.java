package com.gcf.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.repository.OffProgramRepository;
import com.gcf.spring.repository.OnProgramRepository;

@Service
public class ProgramService {

    @Autowired
    private OnProgramRepository onProgramRepository;

    @Autowired
    private OffProgramRepository offProgramRepository;

    public List<OnProgramDto> getAllApprovedOnPrograms() {
        List<OnProgram> approvedOnPrograms = onProgramRepository.findAllByApprovalState("승인");
        List<OnProgramDto> approvedOnProgramsDTO = new ArrayList<>();
        // 콘솔에 엔티티 및 속성을 출력합니다.
        for (OnProgram program : approvedOnPrograms) {
            OnProgramDto dto = new OnProgramDto();
            dto=OnProgram.convertToOnProgramDto(program);
            // 필요한 다른 속성들을 설정합니다.
            approvedOnProgramsDTO.add(dto);
        }
        return approvedOnProgramsDTO;
    }

    public List<OffProgramDto> getAllApprovedOffPrograms() {
        List<OffProgram> approvedOffPrograms = offProgramRepository.findAllByApprovalState("승인");
        List<OffProgramDto> approvedOffProgramsDTO = new ArrayList<>();
        for (OffProgram program : approvedOffPrograms) {
            OffProgramDto dto = new OffProgramDto();
            dto=OffProgram.convertToOffProgramDto(program);
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
            dto=OnProgram.convertToOnProgramDto(program);
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
            dto=OffProgram.convertToOffProgramDto(program);
            pendingApprovalOffProgramsDTO.add(dto);
        }
        return pendingApprovalOffProgramsDTO;
    }
}
