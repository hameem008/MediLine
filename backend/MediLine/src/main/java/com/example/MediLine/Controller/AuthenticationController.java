package com.example.MediLine.Controller;

import com.example.MediLine.DTO.*;
import com.example.MediLine.Repository.DoctorRepository;
import com.example.MediLine.Repository.MedicalCenterRepository;
import com.example.MediLine.Repository.PatientRepository;
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

    @Autowired
    private MedicalCenterRegisterService medicalCenterRegisterService;

    @Autowired
    private MedicalCenterLoginService medicalCenterLoginService;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private MedicalCenterRepository medicalCenterRepository;

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
        Patient patient = patientLoginService.loginPatientAndSetCookies(request, response);
        PatientLoginResponse responseBody = new PatientLoginResponse(
                patient.getPatientId().toString(),
                patient.getFirstName() + " " + patient.getLastName(),
                patient.getEmail(),
                "patient",
                null,
                patient.getDateOfBirth().toString(),
                patient.getGender(),
                patient.getBloodGroup(),
                patient.getAddress(),
                patient.getPhoneNumber(),
                null
        );
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

    @PostMapping("/register/medical-center")
    public ResponseEntity registerMedicalCenter(@RequestBody MedicalCenterRegisterRequest request) {
        MedicalCenter registeredMedicalCenter = medicalCenterRegisterService.registerMedicalCenter(request);
        return ResponseEntity.ok(registeredMedicalCenter);
    }

    @PostMapping("/login/medical-center")
    public ResponseEntity loginMedicalCenter(@RequestBody MedicalCenterLoginRequest request, HttpServletResponse response) {
        medicalCenterLoginService.loginMedicalCenterAndSetCookies(request, response);
        Map responseBody = new HashMap<>();
        responseBody.put("role", "ROLE_MEDICAL_CENTER");
        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/patient/profile")
    public ResponseEntity getPatientProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            Patient patient = patientRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("No Patient found with this email."));
            PatientProfileData responseBody = new PatientProfileData(
                    patient.getEmail(),
                    patient.getFirstName(),
                    patient.getLastName(),
                    patient.getGender(),
                    patient.getDateOfBirth(),
                    patient.getBloodGroup(),
                    patient.getPhoneNumber(),
                    patient.getAddress(),
                    patient.getProfilePhotoUrl()
            );
            return ResponseEntity.ok(responseBody);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
    }

    @PostMapping("/patient/profile/update")
    public ResponseEntity<String> updatePatientProfile(@RequestBody PatientProfileData patientProfileData){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            Patient patient = patientRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("No Patient found with this email."));
            patient.setFirstName(patientProfileData.getFirstName());
            patient.setLastName(patientProfileData.getLastName());
            patient.setGender(patientProfileData.getGender());
            patient.setDateOfBirth(patientProfileData.getDateOfBirth());
            patient.setBloodGroup(patientProfileData.getBloodGroup());
            patient.setPhoneNumber(patientProfileData.getPhoneNumber());
            patient.setAddress(patientProfileData.getAddress());
            patient.setProfilePhotoUrl(patientProfileData.getProfilePhotoUrl());
            patientRepository.save(patient);
            return ResponseEntity.ok("Profile Updated Successfully.");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
    }

    @GetMapping("/patient/me")
    public ResponseEntity getPatientMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            String roles = authentication.getAuthorities().toString();
            Patient patient = patientRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("No patient found with this email."));
            PatientLoginResponse responseBody = new PatientLoginResponse(
                    patient.getPatientId().toString(),
                    patient.getFirstName() + " " + patient.getLastName(),
                    patient.getEmail(),
                    "patient",
                    null,
                    patient.getDateOfBirth().toString(),
                    patient.getGender(),
                    patient.getBloodGroup(),
                    patient.getAddress(),
                    patient.getPhoneNumber(),
                    null
            );
            return ResponseEntity.ok(responseBody);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
    }

    @GetMapping("/me")
    public ResponseEntity getMe() {
        System.out.println("bingo bingo");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            String roles = authentication.getAuthorities().toString();
            User responseBody = new User();
            if (roles == "ROLE_PATIENT"){
                Patient patient = patientRepository.findByEmail(email)
                        .orElseThrow(() -> new IllegalArgumentException("No Patient found with this email."));
                responseBody.setUserId(patient.getPatientId());
            } else if (roles == "ROLE_DOCTOR") {
                Doctor doctor = doctorRepository.findByEmail(email)
                        .orElseThrow(() -> new IllegalArgumentException("No Doctor found with this email."));
                responseBody.setUserId(doctor.getDoctorId());
            } else if (roles == "ROLE_MEDICAL_CENTER") {
                MedicalCenter medicalCenter = medicalCenterRepository.findByEmail(email)
                        .orElseThrow(() -> new IllegalArgumentException("No Medical Center found with this email."));
                responseBody.setUserId(medicalCenter.getMedicalCenterId());
            }
            return ResponseEntity.ok(responseBody);
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

    @GetMapping("/medical-center/profile")
    public ResponseEntity<String> getMedicalCenterProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            String roles = authentication.getAuthorities().toString();
            return ResponseEntity.ok("Welcome, " + email + " (Role: " + roles + ")");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
    }
}