package com.example.MediLine.Service;

import com.example.MediLine.DTO.Doctor;
import com.example.MediLine.DTO.DoctorLoginRequest;
import com.example.MediLine.DTO.RefreshToken;
import com.example.MediLine.Repository.DoctorRepository;
import com.example.MediLine.Security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DoctorLoginService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RefreshTokenService refreshTokenService;

    public void loginDoctorAndSetCookies(DoctorLoginRequest request, HttpServletResponse response) {
        Doctor doctor = doctorRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("No doctor found with this email."));

        if (!passwordEncoder.matches(request.getPassword(), doctor.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid password.");
        }

        String accessToken = jwtUtil.generateToken(doctor.getEmail(), "ROLE_DOCTOR");
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(doctor.getEmail()); // Deletes old token

        Cookie accessCookie = new Cookie("accessToken", accessToken);
        accessCookie.setHttpOnly(true);
        accessCookie.setSecure(false); // Set to true in production with HTTPS
        accessCookie.setPath("/");
        accessCookie.setMaxAge(3600); // 1 hour
        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie("refreshToken", refreshToken.getToken());
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false); // Set to true in production with HTTPS
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
        response.addCookie(refreshCookie);
    }
}