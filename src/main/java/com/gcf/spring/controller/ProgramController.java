package com.gcf.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.service.ProgramService;

@RestController
@RequestMapping
public class ProgramController {

    @Autowired
    private ProgramService programService;

    @GetMapping("/manage/getOnLecInfo")
    public List<OnProgram> getOnPrograms() {
        return programService.getAllApprovedOnPrograms();
    }

    @GetMapping("/manage/getOffLecInfo")
    public List<OffProgram> getOffPrograms() {
        return programService.getAllApprovedOffPrograms();
    }
    
    @GetMapping("/manage/getPendingApprovalOnPrograms")
    public List<OnProgram> getPendingApprovalOnPrograms() {
        return programService.getAllPendingApprovalOnPrograms();
    }

    @GetMapping("/manage/getPendingApprovalOffPrograms")
    public List<OffProgram> getPendingApprovalOffPrograms() {
        return programService.getAllPendingApprovalOffPrograms();
    }
}
