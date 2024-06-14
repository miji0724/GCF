//package com.gcf.spring.controller;
//
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.gcf.spring.dto.bannerdto.BannerModulesWrapper;
//import com.gcf.spring.service.BannerService;
//
//@RestController
//@RequestMapping
//public class BannerController {
//
//    private final BannerService bannerService;
//
//    public BannerController(BannerService bannerService) {
//        this.bannerService = bannerService;
//    }
//
//    @PostMapping("/manage/updateBanners")
//    public String updateBanners(BannerModulesWrapper modules) {
//        return bannerService.updateBanners(modules);
//    }
//} 