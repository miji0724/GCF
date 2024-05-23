	package com.gcf.spring.entity;
	
	import java.sql.Date;
	import java.sql.Time;
	
	import com.gcf.spring.constant.Off_Category;
	import com.gcf.spring.constant.Place;
	import com.gcf.spring.constant.ProgramState;
	import com.gcf.spring.constant.Target;
	
	import jakarta.persistence.Column;
	import jakarta.persistence.Entity;
	import jakarta.persistence.EnumType;
	import jakarta.persistence.Enumerated;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.Table;
	import lombok.Getter;
	import lombok.Setter;
	
	@Entity
	@Table(name = "program")
	@Getter
	@Setter
	public class Off_program {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "off_program_number", nullable = false) //프로그램 번호
	    private int off_programNumber;
	
	    @Column(name = "off_program_name", nullable = false) //프로그램 이름 
	    private String off_program_name;
	    
	    @Column(name = "recruitment_start_date", nullable = false) //모집 시작일
	    private Date recruitmentStartDate;
	
	    @Column(name = "recruitment_end_date", nullable = false) //모집 종료일
	    private Date recruitmentEndDate;
	
	    @Column(name = "operating_start_day", nullable = false) //운영 시작일
	    private Date operatingStartDay;
	
	    @Column(name = "operating_end_day", nullable = false) //운영 종료일
	    private Date operatingEndDay;
	
	    @Enumerated(EnumType.STRING)
	    @Column(name = "participation_target", nullable = false) //참가대상
	    private Target participationTarget;
	
	    @Column(name = "participation_fee") //참가료
	    private int participationFee; 
	
	    @Column(name = "start_time", nullable = false) //운영 시작 시간
	    private Time startTime;
	
	    @Column(name = "end_time", nullable = false) // 운영 종료 시간
	    private Time endTime;
	
	    @Column(name = "max_participants", nullable = false) //참가 제한 인원  
	    private int maxParticipants;
	    
	    @Column(name = "current_participants") // 현재 신청(참가) 인원
	    private int currentParticipants;
	
	    @Enumerated(EnumType.STRING)
	    @Column(name = "state") //강의 상태
	    private ProgramState state;
	
	    @Column(name = "day_of_week", nullable = false) // 강의 요일
	    private String dayOfWeek;
	
	    @Column(name = "views") //조회수
	    private int views;
	
	    @Column(name = "likes_count", nullable = false) //좋아요 수 
	    private int likesCount;
	
	    @Enumerated(EnumType.STRING)
	    @Column(name = "offline_category", nullable = false) // 오프라인 카테고리 
	    private Off_Category offlineCategory;
	
	    @Column(name = "note") //비고란
	    private String note; 
	
	    @Enumerated(EnumType.STRING)
	    @Column(name = "place_name", nullable = false) //장소명
	    private Place placeName;
	
	    @Column(name = "bookmark") //북마크 여부
	    private Boolean bookmark;
	    
	    @Enumerated(EnumType.STRING)
	    @Column(name = "On_or_OFF", nullable = false) //온라인 오프라인 구분
	    private Place On_or_OFF;
	}
