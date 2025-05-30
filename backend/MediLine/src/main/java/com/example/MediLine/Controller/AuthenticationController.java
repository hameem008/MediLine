package com.example.MediLine.Controller;

import com.example.MediLine.DTO.*;
import com.example.MediLine.Service.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("")
public class AuthenticationController {

    @Autowired
    private PatientRegisterService patientRegisterService;

    @Autowired
    private PatientLoginService patientLoginService;

    @Autowired
    private DoctorRegisterService doctorRegisterService;

    @Autowired
    private DoctorLoginService doctorLoginService;

    @GetMapping("/ping")
    public String ping() {
        return "Pong 🏓 - Server is alive! Mewo Mewo!";
    }

    @PostMapping("/register/patient")
    public ResponseEntity registerPatient(@RequestBody PatientRegisterRequest request) {
        Patient registeredPatient = patientRegisterService.registerPatient(request);
        return ResponseEntity.ok(registeredPatient);
    }

    @PostMapping("/login/patient")
    public ResponseEntity loginPatient(@RequestBody PatientLoginRequest request, HttpServletResponse response) {
        patientLoginService.loginPatientAndSetCookies(request, response);
        Map responseBody = new HashMap<>();
        responseBody.put("role", "ROLE_PATIENT");
        return ResponseEntity.ok(responseBody);
    }

    @PostMapping("/register/doctor")
    public ResponseEntity registerDoctor(@RequestBody DoctorRegisterRequest request) {
        Doctor registeredDoctor = doctorRegisterService.registerDoctor(request);
        return ResponseEntity.ok(registeredDoctor);
    }

    @PostMapping("/login/doctor")
    public ResponseEntity loginDoctor(@RequestBody DoctorLoginRequest request, HttpServletResponse response) {
        doctorLoginService.loginDoctorAndSetCookies(request, response);
        Map responseBody = new HashMap<>();
        responseBody.put("role", "ROLE_DOCTOR");
        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/patient/profile")
    public ResponseEntity<String> getPatientProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            String roles = authentication.getAuthorities().toString();
            return ResponseEntity.ok("Welcome, " + email + " (Role: " + roles + ")");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
    }

    @GetMapping("/doctor/profile")
    public ResponseEntity<String> getDoctorProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            String roles = authentication.getAuthorities().toString();
            return ResponseEntity.ok("Welcome, " + email + " (Role: " + roles + ")");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
    }
}