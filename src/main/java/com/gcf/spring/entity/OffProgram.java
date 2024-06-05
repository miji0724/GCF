package com.gcf.spring.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;

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
    private int offProgramNumber;

    @Column(name = "off_program_name", nullable = false)
    private String offProgramName;

    @Column(name = "recruitment_start_date", nullable = false)
    private LocalDate recruitmentstartDate;

    @Column(name = "recruitment_end_date", nullable = false)
    private LocalDate recruitmentendDate;

    @Column(name = "operating_start_day", nullable = false)
    private LocalDate operatingStartDay;

    @Column(name = "operating_end_day", nullable = false)
    private LocalDate operatingendDay;

    @Enumerated(EnumType.STRING)
    @Column(name = "participation_fee", nullable = false)
    private Fee participationFee;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "max_participants", nullable = false)
    private int maxParticipants;

    @Column(name = "current_participants", nullable = false)
    private int currentParticipants;

    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private ProgramState state;


    @Column(name = "day_of_week", nullable = false)
    private List<String> dayOfWeek;

    @Column(name = "views", nullable = false)
    @ColumnDefault("0")
    private int views;

    @Column(name = "likes_count", nullable = false)
    @ColumnDefault("0")
    private int likesCount;

    @Enumerated(EnumType.STRING)
    @Column(name = "offline_category", nullable = false)
    private Off_Category offlineCategory;

    @Enumerated(EnumType.STRING)
    @Column(name = "place_name", nullable = false)
    private Place placeName;

    @Enumerated(EnumType.STRING)
    @Column(name = "program_type", nullable = false)
    private On_or_OFF programType;

    @Column(name = "teacher", nullable = false)
    private String teacher;

    @OneToOne
    @JoinColumn(name = "poster_id")
    private Attachment poster;

    @OneToMany(mappedBy = "offProgramInfo", cascade = CascadeType.ALL)
    private List<Attachment> programInfos;

    @OneToMany(mappedBy = "offProgramTeacherInfo", cascade = CascadeType.ALL)
    private List<Attachment> teacherInfos;
}
