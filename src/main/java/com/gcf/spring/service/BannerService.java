package com.gcf.spring.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.repository.BannerOneRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BannerService {
	
	private final BannerOneRepository bannerOneRepository;
	
	public void createBannerOne(){
		
	}
}
