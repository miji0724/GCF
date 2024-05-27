package com.gcf.spring.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "poster")
@Getter
@Setter
public class Poster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "poster_id", nullable = false)
    private int posterId; // 포스터 ID

    @Column(name = "image_url", nullable = false)
    private String imageUrl; // 이미지 URL

    @OneToOne(mappedBy = "poster")
    private Off_program offProgram; // 연관된 오프라인 프로그램

    @OneToOne(mappedBy = "poster")
    private On_Program onlineProgram; // 연관된 온라인 프로그램


    // 매개변수를 가진 생성자
    public Poster(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
