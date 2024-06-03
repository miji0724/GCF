package com.gcf.spring.entity;

import java.time.LocalDate;
import java.util.List;

import com.gcf.spring.constant.Role;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="OnBookMark")
@Getter
@Setter
@ToString
public class OnBookMark {
	
	//id
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    @MapsId
    @OneToOne
    @JoinColumn(name = "id")
    private Member member;
    
    @MapsId
    @OneToOne
    @JoinColumn(name = "on_program_number")
    private OnProgram onprogram;
    
    
}
