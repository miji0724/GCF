package com.gcf.spring.repository;

import com.gcf.spring.entity.TeacherInfo;
import com.gcf.spring.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherInfoRepository extends JpaRepository<TeacherInfo, Integer> {
    List<TeacherInfo> findByTeacher(Teacher teacher);
}
