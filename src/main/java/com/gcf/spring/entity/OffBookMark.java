package com.gcf.spring.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="off_book_mark")
@Getter
@Setter
@ToString
public class OffBookMark {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "member", referencedColumnName = "id")
    private Member member;
    
    @ManyToOne
    @JoinColumn(name = "offProgram", referencedColumnName = "id")
    private OffProgram offProgram;
} 

