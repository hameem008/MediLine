package com.example.MediLine.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PatientLoginResponse {

        private String id;

        private String name;

        private String email;

        private String type;

        private String avatar;

        private String dateOfBirth;

        private String gender;

        private String bloodGroup;

        private String address;

        private String phone;

        private String emergencyContact;
}