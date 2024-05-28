package com.gcf.spring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gcf.spring.dto.AttachmentDto;

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
@Table(name="attachment")
@Getter
@Setter
public class Attachment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column
    private String original_name;
    
    @Column
    private String file_name;
    
    @Column
    private String file_path;
    
    @ManyToOne
    @JoinColumn(name = "notice_id", referencedColumnName = "id")
    @JsonIgnore
    private Notice notice_id; 
    
    @Column
    private String parent;
    
    @Override
    public String toString() {
        return "Attachment{" +
                "fileName='" + this.file_name + '\'' +
                ", filePath='" + this.file_path + '\'' +
                ",notice_id='" + (this. notice_id!= null ? this.notice_id.getId() : null) + '\'' +
                ", Type='" + this.parent + '\'' +
                '}';
    }
}
