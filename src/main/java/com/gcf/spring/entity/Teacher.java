package com.gcf.spring.entity;

import java.sql.Date;
import java.time.Year;

import com.gcf.spring.constant.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "teacher")
@Getter
@Setter
public class Teacher {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @Column(name = "carrer")
    private String carrer;
    
    @Column(name = "career_start_year", nullable = false)
    private Year careerStartYear;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "affiliated_organization")
    private String affiliated_Organization;
    
    @Column(name = "license_code")
    private String license_code;

    @OneToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;
    
    public String getName() {
        return member != null ? member.getName() : null;
    }

    public String getPhoneNumber() {
        return member != null ? member.getPhone_number() : null;
    }
    
    public Role getRole() {
        return member != null ? member.getRole() : null;
    }
    

    // 기본 생성자
    public Teacher() {}

    public Teacher(Member member) {
        this.member = member;
        this.member.setRole(Role.TEACHER); // Member 역할을 TEACHER로 설정
    }


    
    
}
