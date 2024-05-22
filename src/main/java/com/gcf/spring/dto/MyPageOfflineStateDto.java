package com.gcf.spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyPageOfflineStateDto {
    private Long id;
    private String category;
    private String name;
    private String period;
    private boolean approved;

    
}
