package com.example.MediLine.Config;

import com.example.MediLine.Security.JwtAuthenticationFilter;
import com.example.MediLine.Service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers(new AntPathRequestMatcher("/h2-console/**"))
                        .disable()
                )
                .headers(headers -> headers
                        .frameOptions(frame -> frame.sameOrigin())
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/h2-console/**", "/ping", "/register/**", "/login/**", "/refresh").permitAll()
                        .requestMatchers("/logout").authenticated()
                        .requestMatchers("/patient/**").hasRole("PATIENT")
                        .requestMatchers("/doctor/**").hasRole("DOCTOR")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .addLogoutHandler((request, response, authentication) -> {
                            logger.info("Processing logout request. Authentication: {}", authentication);
                            if (request.getCookies() != null) {
                                Arrays.stream(request.getCookies())
                                        .forEach(cookie -> logger.debug("Cookie: {} = {}", cookie.getName(), cookie.getValue()));
                            } else {
                                logger.debug("No cookies found in logout request");
                            }
                            // Clear cookies
                            Cookie accessCookie = new Cookie("accessToken", null);
                            accessCookie.setHttpOnly(true);
                            accessCookie.setPath("/");
                            accessCookie.setMaxAge(0);
                            response.addCookie(accessCookie);

                            Cookie refreshCookie = new Cookie("refreshToken", null);
                            refreshCookie.setHttpOnly(true);
                            refreshCookie.setPath("/");
                            refreshCookie.setMaxAge(0);
                            response.addCookie(refreshCookie);

                            // Delete refresh token from database
                            if (authentication != null) {
                                String email = authentication.getName();
                                logger.info("Deleting refresh token for email: {}", email);
                                try {
                                    refreshTokenService.deleteByEmail(email);
                                    logger.info("Successfully deleted refresh token for email: {}", email);
                                } catch (Exception e) {
                                    logger.error("Failed to delete refresh token for email: {}. Error: {}", email, e.getMessage(), e);
                                }
                            } else {
                                logger.warn("No authentication found during logout. Cannot delete refresh token.");
                            }
                        })
                        .logoutSuccessHandler((request, response, authentication) -> {
                            logger.info("Logout successful");
                            response.setStatus(HttpServletResponse.SC_OK);
                        })
                );

        return http.build();
    }
}