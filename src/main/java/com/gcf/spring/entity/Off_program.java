package com.gcf.spring.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.gcf.spring.constant.Fee;
import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.On_or_OFF;
import com.gcf.spring.constant.Place;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.constant.Target;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor // 자동 생성자 생성
@Entity
@Table(name = "off_program")
@Getter
@Setter
public class Off_program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "off_program_id", nullable = false)
    private Integer off_program_id; // 프로그램 번호

    @Column(name = "off_program_name", nullable = false)
    private String off_program_name; // 프로그램 이름

    @Column(name = "recruitment_start_date", nullable = false)
    private LocalDate recruitment_start_date; // 모집 시작일

    @Column(name = "recruitment_end_date", nullable = false)
    private LocalDate recruitment_end_date; // 모집 종료일

    @Column(name = "operating_start_day", nullable = false)
    private LocalDate operating_start_day; // 운영 시작일

    @Column(name = "operating_end_day", nullable = false)
    private LocalDate operating_end_day; // 운영 종료일

    @Enumerated(EnumType.STRING)
    @Column(name = "participation_target", nullable = false)
    private Target participation_target; // 참가 대상

    @Enumerated(EnumType.STRING)
    @Column(name = "participation_fee")
    private Fee participation_fee; // 참가료

    @Column(name = "start_time", nullable = false)
    private LocalTime start_time; // 운영 시작 시간

    @Column(name = "end_time", nullable = false)
    private LocalTime end_time; // 운영 종료 시간

    @Column(name = "max_participants", nullable = false)
    private int max_participants; // 참가 제한 인원

    @Column(name = "current_participants")
    private int current_participants; // 현재 신청(참가) 인원

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private ProgramState state; // 강의 상태

    @Column(name = "day_of_week", nullable = false)
    private String day_of_week; // 강의 요일

    @Column(name = "views")
    private int views; // 조회수

    @Column(name = "likes_count", nullable = false)
    private int likes_count; // 좋아요 수

    @Enumerated(EnumType.STRING)
    @Column(name = "offline_category", nullable = false)
    private Off_Category offline_category; // 오프라인 카테고리

    @Column(name = "note")
    private String note; // 비고란

    @Enumerated(EnumType.STRING)
    @Column(name = "place_name", nullable = false)
    private Place place_name; // 장소명

    @Column(name = "bookmark")
    private Boolean bookmark; // 북마크 여부

    @Enumerated(EnumType.STRING)
    @Column(name = "program_type", nullable = false)
    private On_or_OFF program_type; // 프로그램 타입 (온라인/오프라인 구분)

    @OneToOne
    @JoinColumn(name = "poster_file_id")
    private Attachment poster; // 포스터 이미지

    @OneToMany(mappedBy = "offProgram",cascade = CascadeType.ALL)
    private List<Attachment> files; // 연관된 파일들 (강의 소개, 강사 소개 등)
    
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
    }
