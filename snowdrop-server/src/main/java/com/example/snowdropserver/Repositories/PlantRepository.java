package com.example.snowdropserver.Repositories;

import com.example.snowdropserver.Models.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Integer> {
    Optional<Plant> getById(int plantId);
    List<Plant> findAllByPlantName(String commonName);
    List<Plant> findAllByScientificName(String scientificName);
    List<Plant> findAllByDifficulty(String difficulty);
}
