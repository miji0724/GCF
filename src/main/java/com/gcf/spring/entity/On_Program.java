package com.gcf.spring.entity;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import com.gcf.spring.constant.On_Category;
import com.gcf.spring.constant.On_or_OFF;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "On_program")
@Getter
@Setter
public class On_Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "on_program_number", nullable = false)
    private int on_programNumber; // 프로그램 번호

    @Column(name = "on_program_name", nullable = false)
    private String on_program_name; // 프로그램 이름

    @Column(name = "operating_Start_day", nullable = false)
    private Date operating_Start_Day; // 운영 시작일

    @Column(name = "views")
    private int views; // 조회수

    @Column(name = "likes_count", nullable = false)
    private int likesCount; // 좋아요 수

    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = On_Category.class)
    @Column(name = "online_category", nullable = false)
    private On_Category offlineCategory; // 온라인 카테고리

    @Column(name = "bookmark")
    private Boolean bookmark; // 북마크 여부

    @Enumerated(EnumType.STRING)
    @Column(name = "program_type", nullable = false)
    private On_or_OFF On_of_Off; // 프로그램 타입 (온라인/오프라인 구분)

    @OneToOne
    @JoinColumn(name = "poster_id")
    private Poster poster; // 포스터 

    @OneToMany(mappedBy = "onProgram")
    private Set<Video> videos = new HashSet<>(); // 동영상 파일들


    public On_Program(String on_program_name, Date operating_Start_Day, int views, int likesCount, On_Category offlineCategory,
                      Boolean bookmark, On_or_OFF On_of_Off, Poster poster) {
        this.on_program_name = on_program_name;
        this.operating_Start_Day = operating_Start_Day;
        this.views = views;
        this.likesCount = likesCount;
        this.offlineCategory = offlineCategory;
        this.bookmark = bookmark;
        this.On_of_Off = On_of_Off;
        this.poster = poster;
    }
}
