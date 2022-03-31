package com.example.snowdropserver.Services;

import com.example.snowdropserver.Exceptions.NoPlantUserComboException;
import com.example.snowdropserver.Exceptions.PlantNotFoundException;
import com.example.snowdropserver.Exceptions.UserNotFoundException;
import com.example.snowdropserver.Exceptions.DuplicatePlantException;
import com.example.snowdropserver.Models.Domains.*;
import com.example.snowdropserver.Models.Plant;
import com.example.snowdropserver.Models.PlantCare;
import com.example.snowdropserver.Models.User;
import com.example.snowdropserver.Repositories.PlantCareRepository;
import com.example.snowdropserver.Repositories.PlantRepository;
import com.example.snowdropserver.Repositories.UserRepository;
import liquibase.pro.packaged.S;
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
    public PlantService(PlantRepository plantRepository, UserRepository userRepository, UserService userService,
                        PlantCareRepository plantCareRepository) {
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
                .plantImage(plant.getPlantImage())
                .soilType(plant.getSoilType())
                .sunlightLevel(plant.getSunlightLevel())
                .minTemperature(plant.getMinTemperature())
                .build();

        return plantInfoDomain;
    }

    public void addNewPlant(AddNewPlantDomain addNewPlantDomain) {
        if (check_common_name_exists(addNewPlantDomain.getCommonName()) && check_scientific_name_exists(addNewPlantDomain.getScientificName())) {
            System.out.println("plant found already");
            throw new DuplicatePlantException();
        }

        Plant plant = Plant.builder()
                .plantName(addNewPlantDomain.getCommonName())
                .scientificName(addNewPlantDomain.getScientificName())
                .plantImage(addNewPlantDomain.getPlantImageUrl())
                .minTemperature(0)
                .soilType("A")
                .sunlightLevel(3)
                .waterNeeds("H")
                .build();

        plantRepository.save(plant);
    }

    public boolean check_common_name_exists(String commonName) {
        List<Plant> plants = plantRepository.findAllByPlantName(commonName);
        return !plants.isEmpty();
    }

    public boolean check_scientific_name_exists(String scientificName) {
        List<Plant> plants = plantRepository.findAllByScientificName(scientificName);
        return !plants.isEmpty();
    }

    public int addUserPlant(int plantId, AddPlantDomain addPlantDomain) {
        String username = addPlantDomain.getUserName();
        System.out.println(username);
        System.out.println(addPlantDomain.getUserName());
//        username = username.substring(1, username.length()-1);
        System.out.println(username);

        Optional<User> maybeUser = userRepository.getByUserName(username);

        if (!maybeUser.isPresent()) {
            System.out.println("User not found.");
            throw new UserNotFoundException();
        }

        User user = maybeUser.get();

        Optional<Plant> maybePlant = plantRepository.getById(plantId);

        if (!maybePlant.isPresent()) {
            System.out.println("Plant not found");
            throw new PlantNotFoundException();
        }

        Plant plant = maybePlant.get();

        String nickname;
        if (addPlantDomain.getNickname().length() == 0) {
            nickname = plant.getPlantName();
        } else {
            nickname = addPlantDomain.getNickname();
        }

        PlantCare plantCare = PlantCare.builder()
                .plant(plant)
                .plantHealth(addPlantDomain.getPlantHealth())
                .fertilizer(null)
                .nickname(nickname)
                .sunlight(0)
                .sunlightSecond(0)
                .sunlightThird(0)
                .temperature(0)
                .waterCurrent(null)
                .waterLast(null)
                .waterNext(null)
                .user(user)
                .build();

        plantCareRepository.save(plantCare);

        System.out.println("In addPlant: " + plantCare.getId());
        System.out.println("Plant care: " + plantCare);

        //user.getPlants().add(plantCare);
        //userRepository.save(user);

        return plantCare.getId();
    }

    public UserPlantsDomain getUserPlants(String username) {
        //username = username.substring(1,username.length()-1);
//        System.out.println(username);

        Optional<User> maybeUser = userRepository.getByUserName(username);
        if (!maybeUser.isPresent()) {
            System.out.println("User not found");
            throw new UserNotFoundException();
        }
        User user = maybeUser.get();

        UserPlantsDomain userPlantsDomain = UserPlantsDomain.builder()
                .caredFor(plantCareRepository.getByUser(user))
                .build();

        return userPlantsDomain;
    }

    public void updateNickName(String username, SetNicknameDomain setNicknameDomain) {
        System.out.println(setNicknameDomain.getPlantCareId());
        System.out.println(setNicknameDomain.getNickname());

        Optional<User> maybeUser = userRepository.getByUserName(username);
        if (!maybeUser.isPresent()) {
            System.out.println("User not found");
            throw new UserNotFoundException();
        }
        User user = maybeUser.get();

        List<PlantCare> userPlants = plantCareRepository.getByUser(user);
        int plantIndex = -1;

        System.out.println("Send plantCareId: " + setNicknameDomain.getPlantCareId());
        for (int i = 0; i < userPlants.size(); i++) {
            System.out.println("Plant in list: " + userPlants.get(i).getId());
            if (userPlants.get(i).getId() == setNicknameDomain.getPlantCareId()) {
                plantIndex = i;
                break;
            }
        }

        if (plantIndex == -1) {
            System.out.println("This info doesn't belong to the user specified");
            throw new NoPlantUserComboException();
        }

        userPlants.get(plantIndex).setNickname(setNicknameDomain.getNickname());
        plantCareRepository.save(userPlants.get(plantIndex));

        System.out.println(plantCareRepository.findAll());
    }

    public WaterPlantDomain logWaterDate(int plantCareId, LogWaterPlantDomain logWaterPlantDomain) {
        String username = logWaterPlantDomain.getUsername();
        System.out.println(username);

        Optional<User> maybeUser = userRepository.getByUserName(username);
        if (!maybeUser.isPresent()) {
            System.out.println("User not found");
            throw new UserNotFoundException();
        }
        User user = maybeUser.get();

        List<PlantCare> userPlants = plantCareRepository.getByUser(user);
        int plantIndex = -1;

        System.out.println("Send plantCareId: " + plantCareId);
        for (int i = 0; i < userPlants.size(); i++) {
            System.out.println("Plant in list: " + userPlants.get(i).getId());
            if (userPlants.get(i).getId() == plantCareId) {
                plantIndex = i;
                break;
            }
        }

        if (plantIndex == -1) {
            System.out.println("User doesn't have this plant");
            throw new NoPlantUserComboException();
        }

        PlantCare userPlant = userPlants.get(plantIndex);
        userPlants.get(plantIndex).setWaterLast(userPlant.getWaterCurrent());
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

        plantCareRepository.save(userPlant);

        WaterPlantDomain waterPlantDomain = WaterPlantDomain.builder()
                .waterNext(userPlant.getWaterNext())
                .build();

        return waterPlantDomain;
    }

    public void deleteUserPlant(int plantCareId, DeleteUserPlantDomain deleteUserPlantDomain) {
        String username = deleteUserPlantDomain.getUsername();
        System.out.println(username);

        Optional<User> maybeUser = userRepository.getByUserName(username);
        if (!maybeUser.isPresent()) {
            System.out.println("User not found");
            throw new UserNotFoundException();
        }
        User user = maybeUser.get();

        List<PlantCare> userPlants = plantCareRepository.getByUser(user);
        int plantIndex = -1;

        System.out.println("Send plantCareId: " + plantCareId);
        for (int i = 0; i < userPlants.size(); i++) {
            System.out.println("Plant in list: " + userPlants.get(i).getId());
            if (userPlants.get(i).getId() == plantCareId) {
                plantIndex = i;
                break;
            }
        }

        if (plantIndex == -1) {
            System.out.println("User doesn't have this plant");
            throw new NoPlantUserComboException();
        }

        PlantCare userPlant = userPlants.get(plantIndex);
        userPlants.remove(userPlant);

        userRepository.save(user);
        plantCareRepository.delete(userPlant);

        System.out.println("The plant was deleted!");
    }

    public void logSunlightExposure(int plantCareId, SunlightExposureDomain sunlightDomain) {
        String username = sunlightDomain.getUsername();
        System.out.println(username);

        Optional<User> maybeUser = userRepository.getByUserName(username);
        if (!maybeUser.isPresent()) {
            System.out.println("User not found");
            throw new UserNotFoundException();
        }
        User user = maybeUser.get();

        List<PlantCare> userPlants = plantCareRepository.getByUser(user);
        int plantIndex = -1;

        System.out.println("Send plantCareId: " + plantCareId);
        for (int i = 0; i < userPlants.size(); i++) {
            System.out.println("Plant in list: " + userPlants.get(i).getId());
            if (userPlants.get(i).getId() == plantCareId) {
                plantIndex = i;
                break;
            }
        }

        if (plantIndex == -1) {
            System.out.println("User doesn't have this plant");
            throw new NoPlantUserComboException();
        }

        PlantCare plantCare = userPlants.get(plantIndex);
        plantCare.setSunlightThird(plantCare.getSunlightSecond());
        plantCare.setSunlightSecond(plantCare.getSunlight());
        plantCare.setSunlight(sunlightDomain.getSunlightLevel());

        plantCareRepository.save(plantCare);
    }

    
}
