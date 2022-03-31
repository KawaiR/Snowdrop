package com.example.snowdropserver.Services;

import com.example.snowdropserver.Models.Plant;
import com.example.snowdropserver.Models.PlantCare;
import com.example.snowdropserver.Repositories.PlantCareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlantCareService {
    public final PlantCareRepository plantCareRepository;

    @Autowired
    public PlantCareService(PlantCareRepository plantCareRepository) {
        this.plantCareRepository = plantCareRepository;
    }

    public List<PlantCare> getAllPlantCare() {
        // this is the logic for the controller endpoint -- it's a simple service so there isn't much logic
        return plantCareRepository.findAll();
    }

    public PlantCare getPlantCareInfo(int plantCareId) {
        Optional<PlantCare> maybePlantCare = plantCareRepository.findById(plantCareId);
        if (!maybePlantCare.isPresent()) {
            System.out.println("plant was not found");
        }

        return null;
    }
}
