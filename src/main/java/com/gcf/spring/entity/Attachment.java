package com.gcf.spring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "attachment")
@Getter
@Setter
public class Attachment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column
	private String original_name;

	@Column
	private String file_name;

	@Column(columnDefinition = "VARCHAR(500)")
	private String file_path;

	@Column
	private String parent;

	@ManyToOne(optional = true)
	@JoinColumn(name = "banner_one_id", referencedColumnName = "id")
	private BannerOne bannerOne;

	@ManyToOne(optional = true)
	@JoinColumn(name = "banner_two_id", referencedColumnName = "id")
	private BannerTwo bannerTwo;

	@ManyToOne(optional = true)
	@JoinColumn(name = "notice_id", referencedColumnName = "id")
	@JsonIgnore
	private Notice notice;
	
	@ManyToOne(optional = true)
	@JoinColumn(name = "off_poster_id", referencedColumnName = "id")
	private OffProgram offProgramPoster;
	
	@ManyToOne(optional = true)
	@JoinColumn(name = "on_poster_id", referencedColumnName = "id")
	private OnProgram onProgramPoster;

	@ManyToOne(optional = true)
	@JoinColumn(name = "program_info_id", referencedColumnName = "id")
	private ProgramInfo programInfo;

	@ManyToOne(optional = true)
	@JoinColumn(name = "teacher_info_id", referencedColumnName = "id")
	private TeacherInfo programTeacherInfo;

	@ManyToOne(optional = true)
	@JoinColumn(name="on_video_id", referencedColumnName = "id")
	private OnVideo onVideo;

}