package com.example.MediLine.Controller;

import com.example.MediLine.DTO.*;
import com.example.MediLine.Service.DoctorLoginService;
import com.example.MediLine.Service.PatientRegisterService;
import com.example.MediLine.Service.DoctorRegisterService;
import com.example.MediLine.Service.PatientLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Patient> registerPatient(@RequestBody PatientRegisterRequest request) {
        Patient registeredPatient = patientRegisterService.registerPatient(request);
        return ResponseEntity.ok(registeredPatient);
    }

    @PostMapping("/login/patient")
    public ResponseEntity<Patient> loginPatient(@RequestBody PatientLoginRequest request) {
        Patient loggedInPatient = patientLoginService.loginPatient(request);
        return ResponseEntity.ok(loggedInPatient);
    }

    @PostMapping("/register/doctor")
    public ResponseEntity<Doctor> registerDoctor(@RequestBody DoctorRegisterRequest request) {
        Doctor registeredDoctor = doctorRegisterService.registerDoctor(request);
        return ResponseEntity.ok(registeredDoctor);
    }

    @PostMapping("/login/doctor")
    public ResponseEntity<Doctor> loginDoctor(@RequestBody DoctorLoginRequest request) {
        Doctor loggedInDoctor = doctorLoginService.loginDoctor(request);
        return ResponseEntity.ok(loggedInDoctor);
    }
}
