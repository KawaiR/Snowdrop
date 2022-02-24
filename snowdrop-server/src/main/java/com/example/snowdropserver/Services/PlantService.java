package com.example.snowdropserver.Services;

import com.example.snowdropserver.Exceptions.NoPlantUserComboException;
import com.example.snowdropserver.Exceptions.PlantNotFoundException;
import com.example.snowdropserver.Exceptions.UserNotFoundException;
import com.example.snowdropserver.Models.Domains.AddUserPlantDomain;
import com.example.snowdropserver.Models.Domains.PlantInfoDomain;
import com.example.snowdropserver.Models.Plant;
import com.example.snowdropserver.Models.PlantCare;
import com.example.snowdropserver.Models.User;
import com.example.snowdropserver.Repositories.PlantCareRepository;
import com.example.snowdropserver.Repositories.PlantRepository;
import com.example.snowdropserver.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PlantService {
    private final PlantRepository plantRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final PlantCareRepository plantCareRepository;

    @Autowired
    public PlantService(PlantRepository plantRepository, UserRepository userRepository, UserService userService, PlantCareRepository plantCareRepository) {
        this.plantRepository = plantRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.plantCareRepository = plantCareRepository;
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

    public int addUserPlant(int plantId, String username) {
        System.out.println("In service method: " + username);
        Optional<User> maybeUser = userRepository.getByUserName(username);

        if (!maybeUser.isPresent()) {
            System.out.println("User not found");
            throw new UserNotFoundException();
        }

        User user = maybeUser.get();
        Optional<Plant> maybePlant = plantRepository.getById(plantId);

        if (!maybePlant.isPresent()) {
            System.out.println("Plant not found");
            throw new PlantNotFoundException();
        }

        Plant plant = maybePlant.get();

        PlantCare plantCare = PlantCare.builder()
                .plant(plant)
                .plantHealth(null)
                .fertilizer(null)
                .nickname(plant.getPlantName())
                .sunlight(0)
                .temperature(0)
                .waterCurrent(null)
                .waterLast(null)
                .waterNext(null)
                .user(user)
                .build();

        plantCareRepository.save(plantCare);

        return plantCare.getId();
    }

    //TODO: write test cases
    public LocalDateTime logWaterDate(String username, int plantId) {
        Optional<User> maybeUser = userRepository.getByUserName(username);

        if (!maybeUser.isPresent()) {
            System.out.println("User not found");
            throw new UserNotFoundException();
        }

        User user = maybeUser.get();
        Optional<Plant> maybePlant = plantRepository.getById(plantId);

        if (!maybePlant.isPresent()) {
            System.out.println("Plant not found");
            throw new PlantNotFoundException();
        }

        Plant plant = maybePlant.get();
        List<PlantCare> userPlants = user.getPlants();
        int plantIndex = -1;

        for (int i = 0; i < userPlants.size(); i++) {
            if (userPlants.get(i).getPlant().getId() == plant.getId()) {
                plantIndex = i;
            }
        }

        if (plantIndex == -1) {
            System.out.println("User doesn't have this plant");
            throw new NoPlantUserComboException();
        }

        PlantCare userPlant = userPlants.get(plantIndex);
        userPlant.setWaterLast(userPlant.getWaterCurrent());
        userPlant.setWaterCurrent(LocalDateTime.now());

        // Water needs classifications follows: https://www.ladwp.cafriendlylandscaping.com/Garden-Resources/WaterNeeds.php
        switch (userPlant.getPlant().getWaterNeeds()) {
            case "H":
                userPlant.setWaterNext(LocalDateTime.now().plusDays(2));
                break;
            case "M":
                userPlant.setWaterNext(LocalDateTime.now().plusDays(3));
                break;
            case "L":
                userPlant.setWaterNext(LocalDateTime.now().plusDays(7));
                break;
            case "VL":
                userPlant.setWaterNext(LocalDateTime.now().plusDays(14));
                break;
        }

        return userPlant.getWaterNext();
    }
}
