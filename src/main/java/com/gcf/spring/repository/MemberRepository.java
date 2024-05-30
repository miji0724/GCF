package com.gcf.spring.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import com.gcf.spring.entity.Member;

public interface MemberRepository extends JpaRepository<Member, String>{
	
	Optional<Member> findByEmail(String email);
	
	Optional<Member> findById(@NonNull String id);
	
	Optional<Member> findByName(String name);
	
	Optional<Member> findIdByNameAndEmail(String name, String email);
	
	Optional<Member> findIdByIdAndEmail(String id, String email);
	
	boolean existsById(String id);
}
