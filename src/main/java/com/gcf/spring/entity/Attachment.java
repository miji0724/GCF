package com.gcf.spring.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    
    @Column
    private Integer parentId;

    @Column
    private String parentType;
    
    @Override
    public String toString() {
        return "Attachment{" +
                "fileName='" + this.fileName + '\'' +
                "filePath='" + this.filePath + '\'' +
                "parentId='" + this.parentId + '\'' +
                "parentType='" + this.parentType + '\'' +
                '}';
    }
}
