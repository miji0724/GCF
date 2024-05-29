package com.gcf.spring.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "poster")
@Getter
@Setter
@NoArgsConstructor // 자동 생성자 생성
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


}
