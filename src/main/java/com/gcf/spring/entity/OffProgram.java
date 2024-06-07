package com.gcf.spring.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import com.gcf.spring.constant.Day_of_week;
import com.gcf.spring.constant.Fee;
import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.On_or_OFF;
import com.gcf.spring.constant.Place;
import com.gcf.spring.constant.ProgramState;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "off_program")
@Getter
@Setter
public class OffProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "off_program_number", nullable = false)  
    private Integer offProgramNumber; //프로그램 번호

    @Column(name = "off_program_name", nullable = false)
    private String offProgramName; //프로그램명
    
    @Column(name = "off_program_detail_name", nullable = false)
    private String offProgramDetailName; //프로그램 상세명
    
    @Column(name = "application_info")
    private String application_info; //프로그램 상세명

    @Column(name = "application_start_date", nullable = false)
    private LocalDate applicationStartDate; //프로그램 신청 시작일

    @Column(name = "application_end_date", nullable = false)
    private LocalDate applicationEndDate; //프로그램 신청 종료일

    @Column(name = "operating_start_day", nullable = false)
    private LocalDate operatingStartDay; //프로그램 운영 시작일

    @Column(name = "operating_end_day", nullable = false)
    private LocalDate operatingEndDay; //프로그램 운영 종료일

    @Enumerated(EnumType.STRING)
    @Column(name = "participation_fee", nullable = false)
    private Fee participationFee; //프로그램 참가료(프로그램별 상이, 없음)

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime; //프로그램 시작 시간

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime; //프로그램 종료 시간

    @Column(name = "max_participants", nullable = false)
    private Integer maxParticipants; //프로그램 최대 인원 수

    @Column(name = "current_participants", nullable = false)
    private Integer currentParticipants = 0; //프로그램 신청 현황 0명

    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private ProgramState state = ProgramState.접수중; //프로그램 상태


    @Column(name = "day_of_week", nullable = false)
    private Day_of_week dayOfWeek; //프로그램 요일 

    @Column(name = "views", nullable = false)
    private Integer views = 0; //프로그램 조회 수

    @Column(name = "likes_count", nullable = false)
    private Integer likesCount = 0; //프로그램 좋아요 수

    @Enumerated(EnumType.STRING)
    @Column(name = "offline_category", nullable = false)
    private Off_Category offlineCategory; //프로그램 카테고리(교육, 체험)

    @Enumerated(EnumType.STRING)
    @Column(name = "place_name", nullable = false)
    private Place placeName; //프로그램 장소명

    @Enumerated(EnumType.STRING)
    @Column(name = "program_type", nullable = false)
    private On_or_OFF programType; //프로그램 온/오프라인 구분

    @ManyToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "id")
    private Teacher teacher; // 강사 ID

    @OneToOne
    @JoinColumn(name = "poster_id")
    private Attachment poster; //프로그램 포스터 정보

    @OneToMany(mappedBy = "offProgramInfo", cascade = CascadeType.ALL)
    private List<Attachment> programInfos; //프로그램 소개

    @OneToMany(mappedBy = "offProgramTeacherInfo", cascade = CascadeType.ALL)
    private List<Attachment> teacherInfos; //강사 소개
}
