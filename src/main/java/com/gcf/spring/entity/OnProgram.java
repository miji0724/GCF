package com.gcf.spring.entity;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
    private Integer onProgramNumber; // 프로그램 번호

    @Column(name = "on_program_name", nullable = false)
    private String onProgramName; // 프로그램 이름

    @Column(name = "operating_start_day", nullable = false)
    private LocalDate operatingStartDay; // 업로드 날짜

    @Column(name = "views")
    private Integer views = 0; // 조회수

    @Column(name = "likes_count", nullable = false)

    private Integer likesCount = 0; // 좋아요 수

    @Column(name = "online_category", nullable = false)
    private String onlineCategory; //프로그램 카테고리


    @Column(name = "program_type", nullable = false)
    private String programType; //프로그램 온/오프라인 구분
    
    @OneToOne
    @JoinColumn(name = "poster_id")
    private Attachment poster; // 포스터 정보
    
    @OneToMany(mappedBy = "onProgramInfo", cascade = CascadeType.ALL)
    private List<ProgramInfo> programInfos; // 프로그램 정보
    
    @OneToMany(mappedBy = "onProgramTeacherInfo", cascade = CascadeType.ALL)
    private List<TeacherInfo> teacherInfos; // 강사 소개 파일

    @OneToMany(mappedBy = "onProgramVideo", cascade = CascadeType.ALL)
    private List<TeacherInfo> videos; // 동영상 리스트
    
    @ManyToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "id")
    private Teacher teacher; // 강사 ID
    
    @OneToMany(mappedBy = "postId", cascade = CascadeType.ALL)
    private List<Comment> comments; // 댓글 리스트
}
