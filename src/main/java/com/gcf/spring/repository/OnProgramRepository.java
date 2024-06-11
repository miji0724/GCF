package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gcf.spring.entity.OnProgram;

public interface OnProgramRepository extends JpaRepository<OnProgram, Integer> {
	List<OnProgram> findAllByApprovalState(String approvalState);

	@Query("SELECT op FROM OnProgram op JOIN op.teacher t JOIN t.member m WHERE m.name LIKE %:searchTerm% AND op.approvalState = :approvalState")
	List<OnProgram> findByTeacherMemberNameContainingAndApprovalState(@Param("searchTerm") String searchTerm,
			@Param("approvalState") String approvalState);

	@Query("SELECT op FROM OnProgram op JOIN op.teacher t WHERE t.id LIKE %:searchTerm% AND op.approvalState = :approvalState")
	List<OnProgram> findByTeacherIdContainingAndApprovalState(@Param("searchTerm") String searchTerm,
	        @Param("approvalState") String approvalState);
	}