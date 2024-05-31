package com.gcf.spring.entity;


import java.time.LocalDate;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.gcf.spring.constant.Role;
import com.gcf.spring.dto.MemberDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "member")
@NoArgsConstructor // 자동 생성자 생성
@Getter
@Setter
public class Member {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;


    @Column(nullable = false)
    private LocalDate birth;

    @Column(nullable = false)
    private String phoneNumber;

    private String telNumber;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String address;

    private String detailAddress;

    
    private List<String> interest;

    @Column(nullable = false)
    private Boolean emailAgreement;

    @Column(nullable = false)
    private Boolean messageAgreement;

    @Column(nullable = false)
    private Boolean mailAgreement;

    private Boolean married;

    private Boolean hasChildren;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(mappedBy = "member")
    private Teacher teacher;


}
