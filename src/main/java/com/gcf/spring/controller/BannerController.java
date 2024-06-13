package com.gcf.spring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.dto.BannerModulesWrapper;
import com.gcf.spring.dto.BannerOneDto;
import com.gcf.spring.dto.BannerTwoDto;
import com.gcf.spring.service.BannerService;

@RestController
@RequestMapping
public class BannerController {

    private final BannerService bannerService;

    public BannerController(BannerService bannerService) {
        this.bannerService = bannerService;
    }

    @PostMapping("/manage/updateBanners")
    public String updateBanners(BannerModulesWrapper modules) {
        return bannerService.updateBanners(modules);
    }
    
    @GetMapping("/banner/banner1")
    public ResponseEntity<List<BannerOneDto>> getBanners() {
        List<BannerOneDto> banners1 = bannerService.getAllBannersOne();
        return new ResponseEntity<>(banners1, HttpStatus.OK);
    }
    
    @GetMapping("/banner/banner2")
    public ResponseEntity<List<BannerTwoDto>> getBanners2() {
        List<BannerTwoDto> banners2 = bannerService.getAllBannersTwo();
        return new ResponseEntity<>(banners2, HttpStatus.OK);
    }
}