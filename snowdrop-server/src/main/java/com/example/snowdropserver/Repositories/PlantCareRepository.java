package com.example.snowdropserver.Repositories;

import com.example.snowdropserver.Models.PlantCare;
import com.example.snowdropserver.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantCareRepository extends JpaRepository<PlantCare, Integer> {
    List<PlantCare> getByUser(User user);
}
