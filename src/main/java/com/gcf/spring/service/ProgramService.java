package com.gcf.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<OnProgram> getAllApprovedOnPrograms() {
        return onProgramRepository.findAllByApprovalState("승인");
    }

    public List<OffProgram> getAllApprovedOffPrograms() {
        return offProgramRepository.findAllByApprovalState("승인");
    }

    public List<OnProgram> getAllPendingApprovalOnPrograms() {
        return onProgramRepository.findAllByApprovalState("승인대기");
    }

    public List<OffProgram> getAllPendingApprovalOffPrograms() {
        return offProgramRepository.findAllByApprovalState("승인대기");
    }
}