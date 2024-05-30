package com.gcf.spring.dto;


import java.time.LocalDate;
import java.util.Set;

import com.gcf.spring.constant.On_Category;
import com.gcf.spring.constant.On_or_OFF;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class On_ProgramDTO {
    private int on_program_number; // 프로그램 번호
    private String on_program_name; // 프로그램 이름
    private LocalDate operating_start_day; // 운영 시작일
    private int views; // 조회수
    private int likes_count; // 좋아요 수
    private On_Category online_category; // 온라인 카테고리
    private Boolean bookmark; // 북마크 여부
    private On_or_OFF program_type; // 프로그램 타입 (온라인/오프라인 구분)
    private FileDTO poster; // 포스터 정보
    private Set<FileDTO> videos; // 동영상 파일들
}
