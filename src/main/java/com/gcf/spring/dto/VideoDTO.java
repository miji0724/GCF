package com.gcf.spring.dto;



import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VideoDTO {
    private int video_id; // 동영상 파일 ID
    private String video_url; // 동영상 파일 URL
    private LocalTime video_duration; // 동영상 파일 시간
    private double progress_rate; // 진도율
    private String episode_number; // 회차
    private String episode_title; // 회차 제목
}
