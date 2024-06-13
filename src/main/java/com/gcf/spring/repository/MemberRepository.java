package com.gcf.spring.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;

import com.gcf.spring.entity.Member;

public interface MemberRepository extends JpaRepository<Member, String>{
	
	Optional<Member> findByEmail(String email);
	
	Optional<Member> findById(@NonNull String id);
	
	Optional<Member> findByName(String name);
	
	Optional<Member> findIdByNameAndEmail(String name, String email);
	
	Optional<Member> findByIdAndEmail(String id, String email);

	List<Member> findByNameContainingIgnoreCase(String name);
	
	boolean existsById(String id);
	
	@Query("SELECT m FROM Member m WHERE LOWER(FUNCTION('DATE_FORMAT', m.createdAt, '%Y-%m-%d %H:%i:%s')) LIKE LOWER(CONCAT('%', :createdAt ,'%'))")
	List<Member> findByCreatedAtContainingIgnoreCase(@Param("createdAt") String createdAt);
}
