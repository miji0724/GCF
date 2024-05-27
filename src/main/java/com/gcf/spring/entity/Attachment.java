package com.gcf.spring.entity;

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
    private Integer id;
    
    @Column
    private String file_name;
    
    @Column
    private String file_path;
    
    @ManyToOne
    @JoinColumn(name = "notice_id")
    private Notice notice_id; 
    
    @Column
    private String type;
    
    @Override
    public String toString() {
        return "Attachment{" +
                "fileName='" + this.file_name + '\'' +
                ", filePath='" + this.file_path + '\'' +
                ",notice_id='" + (this. notice_id!= null ? this.notice_id.getId() : null) + '\'' +
                ", Type='" + this.type + '\'' +
                '}';
    }
    
    public static Attachment createAttachment(AttachmentDto attachmentDto) {
    	Attachment attachment = new Attachment();
    	attachment.setFile_path(attachmentDto.getFile_path());
    	attachment.setFile_name(attachmentDto.getFile_name());
    	attachment.setType(attachmentDto.getType());
    	return attachment;
    }
   
}
