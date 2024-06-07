package com.gcf.spring.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "program_info")
@Getter
@Setter
public class ProgramInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "attachment_id", referencedColumnName = "id")
    private Attachment attachment;

    @ManyToOne
    @JoinColumn(referencedColumnName = "offProgramNumber")
    private OffProgram offProgram;
    
    @ManyToOne
    @JoinColumn(referencedColumnName = "onProgramNumber")
    private OnProgram onProgram;
}
