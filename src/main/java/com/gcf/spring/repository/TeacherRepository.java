package com.gcf.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gcf.spring.entity.Teacher;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, String> {
}
