package com.example.MediLine.Controller;

import com.example.MediLine.DTO.RefreshToken;
import com.example.MediLine.Security.JwtUtil;
import com.example.MediLine.Service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@RequestMapping("/refresh")
public class RefreshTokenController {

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = Arrays.stream(request.getCookies())
                .filter(cookie -> "refreshToken".equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);

        if (refreshToken == null || !refreshTokenService.validateRefreshToken(refreshToken)) {
            return ResponseEntity.status(401).body("Invalid or expired refresh token");
        }

        RefreshToken token = refreshTokenService.findByToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("Refresh token not found"));

        String email = jwtUtil.getEmailFromToken(refreshToken);
        String role = jwtUtil.getRoleFromToken(refreshToken);
        String newAccessToken = jwtUtil.generateToken(email, role);

        Cookie accessCookie = new Cookie("accessToken", newAccessToken);
        accessCookie.setHttpOnly(true);
        accessCookie.setSecure(false); // Set to true in production
        accessCookie.setPath("/");
        accessCookie.setMaxAge(3600); // 1 hour
        response.addCookie(accessCookie);

        return ResponseEntity.ok().build();
    }
}