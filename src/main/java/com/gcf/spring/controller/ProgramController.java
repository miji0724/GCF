package com.gcf.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.service.ProgramService;

@RestController
@RequestMapping
public class ProgramController {

    @Autowired
    private ProgramService programService;

    @GetMapping("/manage/getOnLecInfo")
    public List<OnProgramDto> getOnPrograms() {
        return programService.getAllApprovedOnPrograms();
    }

    @GetMapping("/manage/getOffLecInfo")
    public List<OffProgramDto> getOffPrograms() {
        return programService.getAllApprovedOffPrograms();
    }
    
    @GetMapping("/manage/getPendingApprovalOnPrograms")
    public List<OnProgramDto> getPendingApprovalOnPrograms() {
        return programService.getAllPendingApprovalOnPrograms();
    }

    @GetMapping("/manage/getPendingApprovalOffPrograms")
    public List<OffProgramDto> getPendingApprovalOffPrograms() {
        return programService.getAllPendingApprovalOffPrograms();
    }
}
