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

    @Column(columnDefinition = "VARCHAR(500)")
    private String file_path;

    @Column
    private String parent;

}