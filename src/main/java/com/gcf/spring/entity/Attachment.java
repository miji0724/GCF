package com.gcf.spring.entity;

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
    private Integer id;
    
    @Column
    private String fileName;
    
    @Column
    private String filePath;
    
    @ManyToOne
    @JoinColumn(name = "notice_id")
    private Notice notice_id; 
    
    @Column
    private String Type;
    
    @Override
    public String toString() {
        return "Attachment{" +
                "fileName='" + this.fileName + '\'' +
                ", filePath='" + this.filePath + '\'' +
                ",notice_id='" + (this. notice_id!= null ? this.notice_id.getId() : null) + '\'' +
                ", Type='" + this.Type + '\'' +
                '}';
    }
   
}
