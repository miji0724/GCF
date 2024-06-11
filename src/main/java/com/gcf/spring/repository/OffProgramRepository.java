package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gcf.spring.entity.OffProgram;

public interface OffProgramRepository extends JpaRepository<OffProgram, Integer> {
	List<OffProgram> findAllByApprovalState(String approvalState);

	@Query("SELECT op FROM OffProgram op JOIN op.teacher t JOIN t.member m WHERE m.name LIKE %:searchTerm% AND op.approvalState = :approvalState")
	List<OffProgram> findByTeacherMemberNameContainingAndApprovalState(@Param("searchTerm") String searchTerm,
			@Param("approvalState") String approvalState);

	@Query("SELECT op FROM OffProgram op JOIN op.teacher t WHERE t.id LIKE %:searchTerm% AND op.approvalState = :approvalState")
	List<OffProgram> findByTeacherIdContainingAndApprovalState(@Param("searchTerm") String searchTerm,
	        @Param("approvalState") String approvalState);
	}
