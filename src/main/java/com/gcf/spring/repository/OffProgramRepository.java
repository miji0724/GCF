package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gcf.spring.entity.OffProgram;

public interface OffProgramRepository extends JpaRepository<OffProgram, Integer> {
    List<OffProgram> findAllByApprovalState(String approvalState);
    List<OffProgram> findByMemberId(String memberId);
}