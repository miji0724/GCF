package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gcf.spring.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, String> {
	List<Teacher> findByTeacherState(String teacherState);
}