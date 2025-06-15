package com.example.MediLine.DTO;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;


@Entity
@Table(name = "medical_center")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer medicalCenterId;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(unique = true)
    private String phoneNumber;

    private String address;

    private String profilePhotoUrl;

    @OneToMany(mappedBy = "medicalCenter")
    private List<DoctorAvailability> doctorAvailabilities;

}