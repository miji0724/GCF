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

    private String description; 

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "attachment_id", referencedColumnName = "id")
    private Attachment attachment;

    @ManyToOne
    @JoinColumn(name = "off_program_id", referencedColumnName = "offProgramNumber")
    private OffProgram offProgram;
    
    @ManyToOne
    @JoinColumn(name = "on_program_id", referencedColumnName = "onProgramNumber")
    private OnProgram onProgram;
}
