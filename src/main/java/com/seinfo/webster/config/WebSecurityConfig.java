package com.seinfo.webster.config;

import com.seinfo.webster.util.security.CustomAccessDeniedHandler;
import com.seinfo.webster.util.token.JwtAuthenticationFilter;
import com.seinfo.webster.util.token.JwtRefreshFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Primary
@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {

	private final UserDetailsService userDetailsService;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final JwtRefreshFilter jwtRefreshFilter;
	private final CustomAccessDeniedHandler customAccessDeniedHandler;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable)
				.formLogin(AbstractHttpConfigurer::disable)
				.httpBasic(AbstractHttpConfigurer::disable)
				.userDetailsService(userDetailsService)
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(jwtRefreshFilter, JwtAuthenticationFilter.class);

		http.sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); //세션 유지 정책

		// 허용 주소
		http.authorizeHttpRequests((requests) -> {
			requests.requestMatchers("/admin/**").hasRole("ADMIN")
					.requestMatchers("/**", "/anyone/**", "/login/**", "/template/**", "/sample/**").permitAll()
					.anyRequest().authenticated();
		}).exceptionHandling(ex -> ex
                // 미로그인 사용자가 보호 URL 접근 시 → 원하는 페이지로 리다이렉트
                .authenticationEntryPoint((req, res, e) -> res.sendRedirect("/error/accessDenied"))
                // 로그인은 했지만 권한 부족 or CSRF → 커스텀 핸들러에서 처리
                .accessDeniedHandler(customAccessDeniedHandler)
        );

		return http.build();
	}


	// 비밀번호 암호화
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
}
