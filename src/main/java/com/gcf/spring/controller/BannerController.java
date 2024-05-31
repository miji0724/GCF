package com.gcf.spring.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BannerController {

	 @PostMapping("/manage/updateBanners")
	    public ResponseEntity<String> updateBanners(@RequestBody List<Module> modules) {
	        // 받은 데이터 처리
	        System.out.println("Received modules: " + modules);
	        
	        return ResponseEntity.ok("Data received successfully");
	    }	
}