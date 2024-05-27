package com.gcf.spring.dto;

import java.sql.Time;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VideoDTO {
    private int videoId; // 동영상 파일 ID
    private String videoUrl; // 동영상 파일 URL
    private Time videoDuration; // 동영상 파일 시간
    private double progressRate; // 진도율
    private String episodeNumber; // 회차
    private String episodeTitle; // 회차 제목
}
