package com.gcf.spring.controller;

import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberController {
		
	private final MemberService memberService;
}
