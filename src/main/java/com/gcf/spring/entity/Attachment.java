package com.gcf.spring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
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

    @Column
    private String file_path;

    @ManyToOne
    @JoinColumn(name = "noticeId", referencedColumnName = "id")
    @JsonIgnore
    private Notice noticeId;

    @Column
    private String parent;

    @OneToOne(mappedBy = "poster")
    private OffProgram offProgramPoster;

    @OneToOne(mappedBy = "poster")
    private OnProgram onProgramPoster;

    @ManyToOne
    @JoinColumn(name = "off_program_info_id")
    private ProgramInfo offProgramInfo;

    @ManyToOne
    @JoinColumn(name = "on_program_info_id")
    private ProgramInfo onProgramInfo;

    @ManyToOne
    @JoinColumn(name = "off_program_teacher_info_id")
    private TeacherInfo offProgramTeacherInfo;

    @ManyToOne
    @JoinColumn(name = "on_program_teacher_info_id")
    private TeacherInfo onProgramTeacherInfo;


}
