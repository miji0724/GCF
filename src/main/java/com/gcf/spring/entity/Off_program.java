package com.gcf.spring.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.gcf.spring.constant.Fee;
import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.On_or_Off;
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
    @Column(name = "off_program_number", nullable = false)
    private int offProgramNumber; // 프로그램 번호

    @Column(name = "off_program_name", nullable = false)
    private String offProgramName; // 프로그램 이름

    @Column(name = "recruitment_start_date", nullable = false)
    private LocalDate recruitmentStartDate; // 모집 시작일

    @Column(name = "recruitment_end_date", nullable = false)
    private LocalDate recruitmentEndDate; // 모집 종료일

    @Column(name = "operating_start_day", nullable = false)
    private LocalDate operatingStartDay; // 운영 시작일

    @Column(name = "operating_end_day", nullable = false)
    private LocalDate operatingEndDay; // 운영 종료일

    @Enumerated(EnumType.STRING)
    @Column(name = "participation_target", nullable = false)
    private Target participationTarget; // 참가 대상

    @Enumerated(EnumType.STRING)
    @Column(name = "participation_fee")
    private Fee participationFee; // 참가료

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime; // 운영 시작 시간

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime; // 운영 종료 시간

    @Column(name = "max_participants", nullable = false)
    private int maxParticipants; // 참가 제한 인원

    @Column(name = "current_participants")
    private int currentParticipants; // 현재 신청(참가) 인원

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private ProgramState state; // 강의 상태

    @Column(name = "day_of_week", nullable = false)
    private String dayOfWeek; // 강의 요일

    @Column(name = "views")
    private int views; // 조회수

    @Column(name = "likes_count", nullable = false)
    private int likesCount; // 좋아요 수

    @Enumerated(EnumType.STRING)
    @Column(name = "offline_category", nullable = false)
    private Off_Category offlineCategory; // 오프라인 카테고리

    @Column(name = "note")
    private String note; // 비고란

    @Enumerated(EnumType.STRING)
    @Column(name = "place_name", nullable = false)
    private Place placeName; // 장소명

    @Column(name = "bookmark")
    private Boolean bookmark; // 북마크 여부

    @Enumerated(EnumType.STRING)
    @Column(name = "program_type", nullable = false)
    private On_or_Off programType; // 프로그램 타입 (온라인/오프라인 구분)

    @OneToOne
    @JoinColumn(name = "poster_file_id")
    private FileEntity poster; // 포스터 이미지

    @OneToMany(mappedBy = "offProgram",cascade = CascadeType.ALL)
    private List<FileEntity> files; // 연관된 파일들 (강의 소개, 강사 소개 등)
    
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
    }