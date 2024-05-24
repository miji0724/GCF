package com.gcf.spring.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.gcf.spring.service.MemberService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Autowired
    private MemberService memberService;
    
    @Autowired
    private PasswordEncoderConfig passwordEncoderConfig;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
        		.csrf(csrf -> csrf.disable())
//                .formLogin(formLogin -> formLogin
//                        .loginPage("/member/login")  // 커스텀 로그인 페이지 설정
//                        .defaultSuccessUrl("/")  // 로그인 성공 시 이동할 기본 URL
//                        .usernameParameter("id")  // 로그인 시 사용할 아이디 파라미터명
//                        .passwordParameter("password")  // 로그인 시 사용할 비밀번호 파라미터명
//                        .failureUrl("/member/login/error")  // 로그인 실패 시 이동할 URL
//                        .permitAll())
                
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        .logoutSuccessUrl("/"))

                .authorizeHttpRequests(request -> request
                        .requestMatchers(new AntPathRequestMatcher("/member/**")).permitAll()  // 회원 관련 모든 URL 허용
                        .requestMatchers(new AntPathRequestMatcher("/**/**/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/**/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/**")).hasRole("ADMIN")  // 관리자 페이지 접근 권한 설정
                        .requestMatchers(new AntPathRequestMatcher("/member/Authentication")).permitAll() // 비밀번호만을 입력하여 인증이 가능한 URL
                        .requestMatchers(new AntPathRequestMatcher("/member/**")).permitAll()  // 회원 관련 모든 URL 허용
                        .requestMatchers(new AntPathRequestMatcher("/admin/**")).hasRole("ADMIN")  // 관리자 페이지 접근 권한 설정
                        .anyRequest().authenticated())

                .exceptionHandling(handling -> handling
                        .authenticationEntryPoint(new CustomAuthenticationEntryPoint()));

        return http.build();
    }


    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(memberService);
        provider.setPasswordEncoder(passwordEncoderConfig.passwordEncoder());
        return provider;
    }

}