package com.gcf.spring.entity;

import jakarta.persistence.*;
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

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "attachment_id", referencedColumnName = "id")
	private Attachment attachment; // 첨부파일

	@ManyToOne
	@JoinColumn(name = "on_program_id", referencedColumnName = "on_program_number")
	private OnProgram onProgram; // 연관된 오프라인 프로그램

	@ManyToOne
	@JoinColumn(name = "off_program_id", referencedColumnName = "off_program_number")
	private OffProgram offProgram; // 연관된 오프라인 프로그램
}