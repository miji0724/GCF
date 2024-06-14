package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gcf.spring.entity.OnProgram;

public interface OnProgramRepository extends JpaRepository<OnProgram, Integer>{
	// 카테고리로 프로그램 검색
    Page<OnProgram> findByCategoryContaining(String category, Pageable pageable);

    // 이름으로 프로그램 검색
    Page<OnProgram> findByProgramNameContaining(String programName, Pageable pageable);
	
	List<OnProgram> findAllByApprovalState(String approvalState);
	
	// 조회수가 높은 순으로 4개 가져오기
	List<OnProgram> findTop4ByApprovalStateOrderByViewsDesc(String approvalState);

	// 최신순으로 4개 가져오기
	List<OnProgram> findTop4ByApprovalStateOrderByOperatingStartDayDesc(String approvalState);
	
//	List<OnProgram> findByMemberId(String userId);
	 
	@Query("SELECT op FROM OnProgram op JOIN op.teacher t JOIN t.member m WHERE m.name LIKE %:searchTerm% AND op.approvalState = :approvalState")
	List<OnProgram> findByTeacherMemberNameContainingAndApprovalState(@Param("searchTerm") String searchTerm, @Param("approvalState") String approvalState);

	@Query("SELECT op FROM OnProgram op JOIN op.teacher t WHERE t.id LIKE %:searchTerm% AND op.approvalState = :approvalState")
	List<OnProgram> findByTeacherIdContainingAndApprovalState(@Param("searchTerm") String searchTerm, @Param("approvalState") String approvalState);
}