package com.gcf.spring.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "teacher_info")
@Getter
@Setter
public class TeacherInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bb;

    private String description; 



}
