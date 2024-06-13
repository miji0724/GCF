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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "teacher_info")
@Getter
@Setter
public class TeacherInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "description")
	private String description;
	
	@ManyToOne
    @JoinColumn(name = "teacher_id") // 지울 예정 ***
    private Teacher teacher;

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "attachment_id", referencedColumnName = "id")
	private Attachment attachment; // 첨부파일

	@ManyToOne
	@JoinColumn(name = "on_program_id", referencedColumnName = "id")
	@JsonIgnore
	private OnProgram onProgram; // 연관된 오프라인 프로그램

	@ManyToOne
	@JoinColumn(name = "off_program_id", referencedColumnName = "id")
	@JsonIgnore
	private OffProgram offProgram; // 연관된 오프라인 프로그램
}