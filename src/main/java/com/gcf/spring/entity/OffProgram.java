package com.gcf.spring.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.gcf.spring.constant.Day_of_week;
import com.gcf.spring.dto.OffProgramDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "off_program")
@Getter
@Setter
public class OffProgram {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Integer id; // 프로그램 번호

	@ManyToOne
	@JoinColumn(name = "teacher_id", referencedColumnName = "id")
	private Teacher teacher; // 강사 ID

	@Column(name = "off_program_name", nullable = false)
	private String programName; // 프로그램명

	@Column(name = "off_program_detail_name", nullable = false)
	private String programDetailName; // 프로그램 상세명

	@Column(name = "application_info")
	private String application_info; // 모집안내 

	@Column(name = "application_start_date", nullable = false)
	private LocalDate applicationStartDate; // 프로그램 모집 시작일

	@Column(name = "application_end_date", nullable = false)
	private LocalDate applicationEndDate; // 프로그램 모집 종료일

	@Column(name = "operating_start_day", nullable = false)
	private LocalDate operatingStartDay; // 프로그램 운영 시작일

	@Column(name = "operating_end_day", nullable = false)
	private LocalDate operatingEndDay; // 프로그램 운영 종료일

	@Column(name = "participation_fee", nullable = false)
	private String participationFee; // 프로그램 참가료(프로그램별 상이, 없음)

	@Column(name = "start_time", nullable = false)
	private LocalTime startTime; // 프로그램 시작 시간

	@Column(name = "end_time", nullable = false)
	private LocalTime endTime; // 프로그램 종료 시간

	@Column(name = "max_participants", nullable = false)
	private Integer maxParticipants; // 프로그램 정원 수

	@Column(name = "current_participants", nullable = false)
	private Integer currentParticipants = 0; // 프로그램 신청 현황 0명

	@Column(name = "state", nullable = false)
	private String applicationState; // 접수중, 접수마감
	
	@Column(nullable = false)
	private String approvalState; // 승인대기, 승인, 미승인

	@Column(name = "day_of_week", nullable = false)
	private Day_of_week dayOfWeek; // 프로그램 요일

	@Column(name = "views", nullable = false)
	private Integer views = 0; // 프로그램 조회 수

	@Column(name = "likes_count", nullable = false)
	private Integer likesCount = 0; // 프로그램 좋아요 수

	@Column(name = "offline_category", nullable = false)
	private String category; // 프로그램 카테고리(교육, 체험)

	@Column(nullable = false)
	private String placeName; // 프로그램 장소명

	@Column(nullable = false)
	private String programType; // 프로그램 온/오프라인 구분
	
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "poster_id")
	private Attachment poster; // 프로그램 포스터 정보

	@OneToMany(mappedBy = "offProgram", cascade = CascadeType.ALL)
	private List<ProgramInfo> programInfos; // 프로그램 소개

	@OneToMany(mappedBy = "offProgram", cascade = CascadeType.ALL)
	private List<TeacherInfo> teacherInfos; // 강사 소개

	public static OffProgram createOffProgram(OffProgramDto off_programDto) {
		OffProgram offProgram = new OffProgram();
		offProgram.setProgramName(off_programDto.getProgramName());
		offProgram.setTeacher(off_programDto.getTeacher());
		offProgram.setProgramDetailName(off_programDto.getProgramDetailName());
		offProgram.setApplication_info(off_programDto.getApplication_info());
		offProgram.setOperatingStartDay(off_programDto.getOperatingStartDay());
		offProgram.setOperatingEndDay(off_programDto.getOperatingEndDay());
		offProgram.setApplicationStartDate(off_programDto.getApplicationStartDate());
		offProgram.setApplicationEndDate(off_programDto.getApplicationEndDate());
		offProgram.setParticipationFee(off_programDto.getParticipationFee());
		offProgram.setStartTime(off_programDto.getStartTime());
		offProgram.setEndTime(off_programDto.getEndTime());
		offProgram.setMaxParticipants(off_programDto.getMaxParticipants());
		offProgram.setCurrentParticipants(off_programDto.getCurrentParticipants());
		offProgram.setApplicationState(off_programDto.getApplicationState());
		offProgram.setApprovalState(off_programDto.getApprovalState());
		offProgram.setDayOfWeek(off_programDto.getDayOfWeek());
		offProgram.setViews(off_programDto.getViews());
		offProgram.setLikesCount(off_programDto.getLikesCount());
		offProgram.setCategory(off_programDto.getCategory());
		offProgram.setPlaceName(off_programDto.getPlaceName());
		offProgram.setProgramType(off_programDto.getProgramType());
		offProgram.setPoster(off_programDto.getPoster());
		offProgram.setProgramInfos(off_programDto.getProgramInfos());
		offProgram.setTeacherInfos(off_programDto.getTeacherInfos());
		return offProgram;
	}
	
	@Override
    public String toString() {
        return "OffProgram{" +
                "id=" + id +
                ", teacher=" + (teacher != null ? teacher.getId() : "null") +
                ", programName='" + programName + '\'' +
                ", programDetailName='" + programDetailName + '\'' +
                ", application_info='" + application_info + '\'' +
                ", applicationStartDate=" + applicationStartDate +
                ", applicationEndDate=" + applicationEndDate +
                ", operatingStartDay=" + operatingStartDay +
                ", operatingEndDay=" + operatingEndDay +
                ", participationFee='" + participationFee + '\'' +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", maxParticipants=" + maxParticipants +
                ", currentParticipants=" + currentParticipants +
                ", applicationState='" + applicationState + '\'' +
                ", approvalState='" + approvalState + '\'' +
                ", dayOfWeek=" + dayOfWeek +
                ", views=" + views +
                ", likesCount=" + likesCount +
                ", category='" + category + '\'' +
                ", placeName='" + placeName + '\'' +
                ", programType='" + programType + '\'' +
                ", poster=" + (poster != null ? poster.getId() : "null") +
                ", programInfos=" + programInfos +
                ", teacherInfos=" + teacherInfos +
                '}';
	}
}