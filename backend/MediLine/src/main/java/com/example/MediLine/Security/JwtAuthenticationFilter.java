package com.example.MediLine.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = null;
        logger.debug("Processing request for URI: {}", request.getRequestURI());
        if (request.getCookies() != null) {
            logger.debug("Cookies found in request: {}", request.getCookies().length);
            for (Cookie cookie : request.getCookies()) {
                logger.debug("Cookie: {} = {}", cookie.getName(), cookie.getValue());
                if ("accessToken".equals(cookie.getName())) {
                    token = cookie.getValue();
                    logger.info("Access token found: {}", token);
                    break;
                }
            }
        } else {
            logger.warn("No cookies found in request");
        }

        if (token != null) {
            logger.debug("Validating access token: {}", token);
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.getEmailFromToken(token);
                String role = jwtUtil.getRoleFromToken(token);
                logger.info("Access token valid. Email: {}, Role: {}", email, role);
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        email, null, Collections.singletonList(new SimpleGrantedAuthority(role)));
                SecurityContextHolder.getContext().setAuthentication(auth);
                logger.debug("Authentication set for email: {}", email);
            } else {
                logger.warn("Invalid or expired access token: {}", token);
            }
        } else {
            logger.warn("No access token found in cookies");
        }

        filterChain.doFilter(request, response);
    }
}