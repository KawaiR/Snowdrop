package com.example.snowdropserver.Services;

import com.example.snowdropserver.Exceptions.InvalidAuthTokenException;
import com.example.snowdropserver.Exceptions.PlantNotFoundException;
import com.example.snowdropserver.Models.Domains.PlantInfoDomain;
import com.example.snowdropserver.Models.Plant;
import com.example.snowdropserver.Models.User;
import com.example.snowdropserver.Repositories.PlantRepository;
import com.example.snowdropserver.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlantService {
    private final PlantRepository plantRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public PlantService(PlantRepository plantRepository, UserRepository userRepository, UserService userService) {
        this.plantRepository = plantRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public List<Plant> getAllPlants() {
        // this is the logic for the controller endpoint -- it's a simple service so there isn't much logic
        return plantRepository.findAll();
    }

    public PlantInfoDomain getPlantInfo(int plantId) {
//        Optional<User> maybeUser = userRepository.getByAuthTokenHash(userService.hash(authToken));
//
//        if (!maybeUser.isPresent()) {
//            System.out.println("Illegal access");
//            throw new InvalidAuthTokenException();
//        }
        Optional<Plant> maybePlant = plantRepository.getById(plantId);

        if (!maybePlant.isPresent()) {
            System.out.println("Plant not found");
            throw new PlantNotFoundException();
        }

        Plant plant = maybePlant.get();

        PlantInfoDomain plantInfoDomain = PlantInfoDomain.builder()
                .plantImage(plant.getPlantImage())
                .plantName(plant.getPlantName())
                .scientificName(plant.getScientificName())
                .waterNeeds(plant.getWaterNeeds())
                .build();

        return plantInfoDomain;
    }
}
