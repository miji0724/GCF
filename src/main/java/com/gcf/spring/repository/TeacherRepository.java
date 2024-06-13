package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gcf.spring.constant.TeacherState;
import com.gcf.spring.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, String> {
	
	List<Teacher> findByTeacherState(TeacherState teacherState);
	
	Teacher findTeacherById(String id);
	
	void deleteById(String id);
	
	List<Teacher> findByMemberNameContainingAndTeacherState(String searchTerm, TeacherState teacherState);

    List<Teacher> findByIdContainingAndTeacherState(String searchTerm, TeacherState teacherState);
}