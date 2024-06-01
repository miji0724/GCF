package com.gcf.spring.entity;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.gcf.spring.constant.On_Category;
import com.gcf.spring.constant.On_or_OFF;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "on_program")
@Getter
@Setter
public class OnProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "on_program_number", nullable = false)
    private int onProgramNumber; // 프로그램 번호

    @Column(name = "on_program_name", nullable = false)
    private String onProgramName; // 프로그램 이름

    @Column(name = "operating_start_day", nullable = false)
    private LocalDate operatingStartDay; // 운영 시작일

    @Column(name = "views")
    private int views; // 조회수

    @Column(name = "likes_count", nullable = false)
    private int likesCount; // 좋아요 수

    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = On_Category.class)
    @Column(name = "online_category", nullable = false)
    private On_Category onlineCategory; // 온라인 카테고리

    @Column(name = "bookmark")
    private Boolean bookmark; // 북마크 여부

    @Enumerated(EnumType.STRING)
    @Column(name = "program_type", nullable = false)
    private On_or_OFF programType; // 프로그램 타입 (온라인/오프라인 구분)

    @OneToOne
    @JoinColumn(name = "poster_file_id")
    private Attachment poster; // 포스터 이미지

    @OneToMany(mappedBy = "on_program",cascade = CascadeType.ALL)
    private Set<Attachment> videos = new HashSet<>(); // 동영상 파일들
    
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
}
