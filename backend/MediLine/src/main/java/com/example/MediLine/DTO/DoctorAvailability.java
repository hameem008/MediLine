package com.example.MediLine.DTO;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "doctor_availability")
@Data
public class DoctorAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer slotId;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "medical_center_id", nullable = false)
    private MedicalCenter medicalCenter;

    // Optional fields
    private String dayOfWeek;
    private String startTime;
    private String endTime;


    // Getters & setters
}

