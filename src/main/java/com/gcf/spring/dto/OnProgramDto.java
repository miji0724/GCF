package com.gcf.spring.dto;

import java.time.LocalDate;
import java.util.List;

import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Comment;
import com.gcf.spring.entity.OnVideo;
import com.gcf.spring.entity.Teacher;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OnProgramDto {
	private Teacher teacher;
	private Integer onProgramNumber; // 프로그램 번호
	private String onProgramName; // 프로그램 이름
	private LocalDate operatingStartDay; // 업로드 날짜
	private Integer views = 0; // 조회수
	private Integer likesCount = 0; // 좋아요 수
	private String onlineCategory; // 프로그램 카테고리
	private String programType; // 프로그램 타입 (온라인/오프라인 구분)
	private Attachment poster; // 포스터 정보
	private List<Attachment> programInfosAttachment; // 교육 소개 파일
	private List<Attachment> teacherInfosAttachment; // 강사 소개 파일
	private List<Comment> comments; // 댓글 리스트
	private List<OnVideo> videos; // 비디오 리스트
}
