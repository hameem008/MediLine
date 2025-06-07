package com.example.MediLine.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "medical_center")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalCenter {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer medicalCenterId;

    @Column(unique = true)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(unique = true)
    private String phoneNumber;

    private String address;

    private String profilePhotoUrl;
}