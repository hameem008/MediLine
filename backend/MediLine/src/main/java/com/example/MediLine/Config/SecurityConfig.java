package com.example.MediLine.Config;

import com.example.MediLine.Security.JwtAuthenticationFilter;
import com.example.MediLine.Security.JwtUtil;
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
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private JwtUtil jwtUtil;

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
                .addFilterBefore(jwtAuthenticationFilter, LogoutFilter.class)
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .addLogoutHandler((request, response, authentication) -> {
                            logger.info("Processing logout request for URI: {}", request.getRequestURI());
                            logger.info("Cookies: {}",
                                    request.getCookies() != null ? Arrays.toString(request.getCookies()) : "None");
                            logger.info("Authentication before logout: {}", authentication);
                            String email = null;
                            String role = null;

                            // Try to get email and role from authentication
                            if (authentication != null) {
                                email = authentication.getName();
                                // Extract role from authorities
                                role = authentication.getAuthorities().stream()
                                        .map(grantedAuthority -> grantedAuthority.getAuthority())
                                        .filter(auth -> auth.startsWith("ROLE_"))
                                        .findFirst()
                                        .orElse(null);
                                logger.debug("From authentication - Email: {}, Role: {}", email, role);
                            }

                            // Fallback to tokens if authentication is null
                            if (email == null || role == null) {
                                logger.debug("Authentication is null or incomplete; checking tokens");
                                String accessToken = null;
                                String refreshToken = null;
                                if (request.getCookies() != null) {
                                    for (Cookie cookie : request.getCookies()) {
                                        logger.debug("Cookie: {} = {}", cookie.getName(), cookie.getValue());
                                        if ("accessToken".equals(cookie.getName())) {
                                            accessToken = cookie.getValue();
                                        } else if ("refreshToken".equals(cookie.getName())) {
                                            refreshToken = cookie.getValue();
                                        }
                                    }
                                }

                                // Try accessToken first
                                if (accessToken != null && jwtUtil.validateToken(accessToken)) {
                                    email = jwtUtil.getEmailFromToken(accessToken);
                                    role = jwtUtil.getRoleFromToken(accessToken);
                                    logger.info("From access token - Email: {}, Role: {}", email, role);
                                }
                                // Fallback to refreshToken
                                else if (refreshToken != null && refreshTokenService.validateRefreshToken(refreshToken)) {
                                    email = jwtUtil.getEmailFromToken(refreshToken);
                                    role = jwtUtil.getRoleFromToken(refreshToken);
                                    logger.info("From refresh token - Email: {}, Role: {}", email, role);
                                } else {
                                    logger.warn("No valid tokens found");
                                }
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
                            if (email != null && role != null) {
                                logger.info("Deleting refresh token for email: {}, role: {}", email, role);
                                try {
                                    refreshTokenService.deleteByEmailAndRole(email, role);
                                    logger.info("Successfully deleted refresh token for email: {}, role: {}", email, role);
                                } catch (Exception e) {
                                    logger.error("Failed to delete refresh token for email: {}, role: {}. Error: {}",
                                            email, role, e.getMessage(), e);
                                }
                            } else {
                                logger.warn("Cannot delete refresh token: email or role is null (email: {}, role: {})",
                                        email, role);
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