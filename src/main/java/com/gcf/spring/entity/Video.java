package com.gcf.spring.entity;


import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "video")
@Getter
@Setter
@NoArgsConstructor // 자동 생성자 생성

public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_id", nullable = false)
    private int videoId; // 동영상 파일 ID

    @Column(name = "video_url", nullable = false)
    private String videoUrl; // 동영상 파일 URL

    @Column(name = "video_duration", nullable = false)
    private LocalTime videoDuration; // 동영상 파일 시간

    @Column(name = "progress_rate", nullable = false)
    private double progressRate; // 진도율

    @Column(name = "episode_number", nullable = false)
    private String episodeNumber; // 회차 (예: 1, 1-1, 1.1, 1-2 등)

    @Column(name = "episode_title", nullable = false)
    private String episodeTitle; // 회차 제목

    @ManyToOne
    @JoinColumn(name = "on_program_id")
    private On_Program on_program; // 연관된 온라인 프로그램


}
