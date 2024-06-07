package com.gcf.spring.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OnProgramDTO {
    
    private Integer onProgramNumber; // 프로그램 번호
    
    private String onProgramName; // 프로그램 이름
    
    private LocalDate operatingStartDay; // 업로드 날짜
    
    private Integer views; // 조회수
    
    private Integer likesCount; // 좋아요 수
    
    private String onlineCategory; // 프로그램 카테고리
    
    private String programType; // 프로그램 온/오프라인 구분
    
    private AttachmentDTO poster; // 포스터 정보
    
    private List<ProgramInfoDTO> programInfos; // 프로그램 정보
    
    private List<TeacherInfoDTO> teacherInfos; // 강사 소개 파일
    
    private List<VideoDTO> videos; // 동영상 리스트
    
    private TeacherDTO teacher; // 강사 ID
    
    private List<CommentDTO> comments; // 댓글 리스트
}
