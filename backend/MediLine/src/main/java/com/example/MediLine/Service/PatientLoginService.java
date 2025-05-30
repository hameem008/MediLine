package com.example.MediLine.Service;

import com.example.MediLine.DTO.Patient;
import com.example.MediLine.DTO.PatientLoginRequest;
import com.example.MediLine.DTO.RefreshToken;
import com.example.MediLine.Repository.PatientRepository;
import com.example.MediLine.Security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PatientLoginService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RefreshTokenService refreshTokenService;

    public void loginPatientAndSetCookies(PatientLoginRequest request, HttpServletResponse response) {
        Patient patient = patientRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("No patient found with this email."));

        if (!passwordEncoder.matches(request.getPassword(), patient.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid password.");
        }

        String accessToken = jwtUtil.generateToken(patient.getEmail(), "ROLE_PATIENT");
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(patient.getEmail()); // Deletes old token

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