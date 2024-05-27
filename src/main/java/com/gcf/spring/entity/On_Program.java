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
@Table(name = "on_program")
@Getter
@Setter
public class On_Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "on_program_number", nullable = false)
    private int on_program_number; // 프로그램 번호

    @Column(name = "on_program_name", nullable = false)
    private String on_program_name; // 프로그램 이름

    @Column(name = "operating_start_day", nullable = false)
    private Date operating_start_day; // 운영 시작일

    @Column(name = "views")
    private int views; // 조회수

    @Column(name = "likes_count", nullable = false)
    private int likes_count; // 좋아요 수

    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = On_Category.class)
    @Column(name = "online_category", nullable = false)
    private On_Category online_category; // 온라인 카테고리

    @Column(name = "bookmark")
    private Boolean bookmark; // 북마크 여부

    @Enumerated(EnumType.STRING)
    @Column(name = "program_type", nullable = false)
    private On_or_OFF program_type; // 프로그램 타입 (온라인/오프라인 구분)

    @OneToOne
    @JoinColumn(name = "poster_id")
    private Poster poster; // 포스터 

    @OneToMany(mappedBy = "on_program")
    private Set<Video> videos = new HashSet<>(); // 동영상 파일들

    // 기본 생성자
    public On_Program() {
    }

    // 매개변수를 가진 생성자
    public On_Program(String on_program_name, Date operating_start_day, int views, int likes_count, On_Category online_category,
                      Boolean bookmark, On_or_OFF program_type, Poster poster) {
        this.on_program_name = on_program_name;
        this.operating_start_day = operating_start_day;
        this.views = views;
        this.likes_count = likes_count;
        this.online_category = online_category;
        this.bookmark = bookmark;
        this.program_type = program_type;
        this.poster = poster;
    }
}
