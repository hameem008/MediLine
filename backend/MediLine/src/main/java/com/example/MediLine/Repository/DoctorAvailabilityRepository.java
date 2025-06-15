package com.example.MediLine.Repository;

import com.example.MediLine.DTO.DoctorAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface DoctorAvailabilityRepository extends JpaRepository<DoctorAvailability, Integer> {

    @Query("SELECT DISTINCT mc.address FROM DoctorAvailability da " +
            "JOIN da.medicalCenter mc")
    List<String> findAllDistinctDoctorLocations();
}
