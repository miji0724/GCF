package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gcf.spring.entity.OnProgram;

public interface OnProgramRepository extends JpaRepository<OnProgram, Integer>{
	List<OnProgram> findAllByApprovalState(String approvalState);
}
