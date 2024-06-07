package com.gcf.spring.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "teacher_info")
@Getter
@Setter
public class ProgramInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "description", nullable = false)
    private String description;  //교육소개

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "attachment_id", referencedColumnName = "id")
    private Attachment attachment; // 첨부파일

    @ManyToOne
    @JoinColumn(name = "off_program_id", referencedColumnName = "id")
    private OffProgram offProgram; // 연관된 오프라인 프로그램
    
    @ManyToOne
    @JoinColumn(name = "on_program_id", referencedColumnName = "id")
    private OnProgram onProgram; // 연관된 오프라인 프로그램
    
    
    
}
