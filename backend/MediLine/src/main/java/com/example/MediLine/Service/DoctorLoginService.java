package com.example.MediLine.Service;

import com.example.MediLine.DTO.Doctor;
import com.example.MediLine.DTO.DoctorLoginRequest;
import com.example.MediLine.Repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DoctorLoginService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Doctor loginDoctor(DoctorLoginRequest request) {
        Doctor doctor = doctorRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("No doctor found with this email."));

        if (!passwordEncoder.matches(request.getPassword(), doctor.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid password.");
        }

        return doctor;
    }
}
