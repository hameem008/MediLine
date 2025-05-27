package com.example.MediLine.Service;

import com.example.MediLine.DTO.Patient;
import com.example.MediLine.DTO.PatientLoginRequest;
import com.example.MediLine.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PatientLoginService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Patient loginPatient(PatientLoginRequest request) {
        Patient patient = patientRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("No patient found with this email."));

        if (!passwordEncoder.matches(request.getPassword(), patient.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid password.");
        }

        return patient;
    }
}
