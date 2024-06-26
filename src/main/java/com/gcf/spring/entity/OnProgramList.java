//package com.gcf.spring.entity;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.gcf.spring.dto.OnProgramDto;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.OneToOne;
//import jakarta.persistence.Table;
//import lombok.Getter;
//import lombok.Setter;
//
//@Entity
//@Table(name = "on_program_list")
//@Getter
//@Setter
//public class OnProgramList {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "id", nullable = false)
//	private Integer id; // 프로그램 번호
//
//	@ManyToOne
//	@JoinColumn(name = "teacher_id", referencedColumnName = "id")
//	private Teacher teacher; // 강사 ID
//
//	@Column(name = "on_program_name", nullable = false)
//	private String programName; // 프로그램 이름
//
//	@Column(name = "operating_start_day", nullable = false)
//	private LocalDate operatingStartDay; // 업로드 날짜
//
//	@Column(name = "views")
//	private Integer views = 0; // 조회수
//
//	@Column(name = "likes_count", nullable = false)
//	private Integer likesCount = 0; // 좋아요 수
//
//	@Column(name = "online_category", nullable = false)
//	private String category; // 프로그램 카테고리
//
//	@Column(name = "program_type", nullable = false)
//	private String programType; // 프로그램 타입 (온라인/오프라인 구분)
//
//	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
//	@JoinColumn(name = "poster_id", referencedColumnName = "id")
//	private Attachment poster; // 포스터 정보
//
//	@Column(nullable = false)
//	private String approvalState; // 승인, 미승인, 승인대기
//
//	@JsonIgnore
//    @OneToMany(mappedBy = "onProgram", cascade = CascadeType.ALL)
//    private List<ProgramInfo> programInfos;
//
//	@JsonIgnore
//    @OneToMany(mappedBy = "onProgram", cascade = CascadeType.ALL)
//    private List<TeacherInfo> teacherInfos; 
//
//	@JsonIgnore
//    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
//    private List<Comment> comments;
//
//	@JsonIgnore
//	@OneToMany(mappedBy = "onProgram", cascade = CascadeType.ALL)
//	private List<OnVideo> videos; // 비디오 리스트
//
//	 public static OnProgram createOnProgram(OnProgramDto on_programDto) {
//	        OnProgram onProgram = new OnProgram();
////	        onProgram.setTeacher(on_programDto.getTeacher());
//	        onProgram.setProgramName(on_programDto.getProgramName());
//	        onProgram.setOperatingStartDay(LocalDate.now());
//	        onProgram.setViews(on_programDto.getViews());
//	        onProgram.setLikesCount(on_programDto.getLikesCount());
//	        onProgram.setCategory(on_programDto.getCategory()); // 필드명 변경
//	        onProgram.setProgramType(on_programDto.getProgramType());
//	        onProgram.setProgramInfos(on_programDto.getProgramInfos());
//	        onProgram.setTeacherInfos(on_programDto.getTeacherInfos());
//	        onProgram.setComments(on_programDto.getComments());
//	        onProgram.setVideos(on_programDto.getVideos());
//	        onProgram.setPoster(on_programDto.getPoster());
//	        onProgram.setApprovalState(on_programDto.getApprovalState());
//	        return onProgram;
//	    }
//
//	public static OnProgramDto convertToOnProgramDto(OnProgram onProgram) {
//		OnProgramDto dto = new OnProgramDto();
////		dto.setTeacher(onProgram.getTeacher());
//		dto.setProgramName(onProgram.getProgramName());
//		dto.setOperatingStartDay(onProgram.getOperatingStartDay());
//		dto.setViews(onProgram.getViews());
//		dto.setLikesCount(onProgram.getLikesCount());
//		dto.setCategory(onProgram.getCategory());
//		dto.setProgramType(onProgram.getProgramType());
//		dto.setProgramInfos(onProgram.getProgramInfos());
//		dto.setTeacherInfos(onProgram.getTeacherInfos());
//		dto.setPoster(onProgram.getPoster());
//		dto.setComments(onProgram.getComments());
//		dto.setApprovalState(onProgram.getApprovalState());
//		dto.setVideos(onProgram.getVideos());
//		return dto;
//	}
//}