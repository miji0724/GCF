package com.gcf.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)	// security 임시로 꺼놓기
public class GcfApplication {

	public static void main(String[] args) {
		SpringApplication.run(GcfApplication.class, args);
	}

}
