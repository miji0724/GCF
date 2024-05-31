package com.gcf.spring.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

//배너2
public class BannerTwo {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;

    //ID에 해당하는 Url을 저장하는 컬럼이다.
    @Column
    private String Url;

    //ID에 해당하는 그림을 저장하는 컬럼이다.
    private Attachment attachments;
}
