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
            .cors(cors -> cors.and()) // CORS 설정 추가
            .logout(logout -> logout
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/"))

            .authorizeHttpRequests(request -> request
                .requestMatchers(new AntPathRequestMatcher("/member/login")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/member/signup")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/member/findId")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/member/authentication")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/member/info")).authenticated()
                .requestMatchers(new AntPathRequestMatcher("/admin/**")).hasRole("ADMIN")
                .anyRequest().permitAll())

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
