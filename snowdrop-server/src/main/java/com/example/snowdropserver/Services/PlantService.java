package com.example.snowdropserver.Services;

import com.example.snowdropserver.Exceptions.*;
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
import java.util.ArrayList;
import java.util.Comparator;
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
                .plantImage(plant.getPlantImage())
                .soilType(plant.getSoilType())
                .sunlightLevel(plant.getSunlightLevel())
                .reportedSunlight(plant.getReportedSunlight())
                .minTemperature(plant.getMinTemperature())
                .difficulty(plant.getDifficulty())
                .build();

        return plantInfoDomain;
    }

    public int addNewPlant(AddNewPlantDomain addNewPlantDomain) {
        if (check_common_name_exists(addNewPlantDomain.getCommonName())
                && check_scientific_name_exists(addNewPlantDomain.getScientificName())) {
            System.out.println("plant found already");
            throw new DuplicatePlantException();
        }

        String difficulty = "";

        if (addNewPlantDomain.getWaterNeeds().equals("H") &&
                (addNewPlantDomain.getSoilType().equals("A") || addNewPlantDomain.getSoilType().equals("N"))) {
            difficulty = "E";
        } else if (addNewPlantDomain.getWaterNeeds().equals("M") ||
                (addNewPlantDomain.getSoilType().equals("N"))) {
            difficulty = "I";
        } else if (addNewPlantDomain.getWaterNeeds().equals("L") || addNewPlantDomain.getWaterNeeds().equals("VL")) {
            difficulty = "B";
        }

        Plant plant = Plant.builder()
                .plantName(addNewPlantDomain.getCommonName())
                .scientificName(addNewPlantDomain.getScientificName())
                .plantImage(addNewPlantDomain.getPlantImageUrl())
                .minTemperature(addNewPlantDomain.getMinTemperature())
                .soilType(addNewPlantDomain.getSoilType())
                .sunlightLevel(addNewPlantDomain.getSunlightLevel())
                .waterNeeds(addNewPlantDomain.getWaterNeeds())
                .reportedSunlight(addNewPlantDomain.getReportedSunlight())
                .difficulty(difficulty)
                .build();

        plantRepository.save(plant);

        return plant.getId();
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
                .sunlight(-1)
                .sunlightSecond(-1)
                .sunlightThird(-1)
                .reportedExposure(0)
                .reportedSecond(0)
                .reportedThird(0)
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
        List<PlantCare> caredFor = plantCareRepository.getByUser(user);
        UserPlantsDomain userPlantsDomain = UserPlantsDomain.builder()
                .caredFor(caredFor)
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

    public int deleteUserPlant(int plantCareId, DeleteUserPlantDomain deleteUserPlantDomain) {
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

        return plantCareId;
    }

    // reported exposure not UV
    public boolean logSunlightExposure(int plantCareId, SunlightExposureDomain sunlightDomain) {
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
        plantCare.setReportedThird(plantCare.getReportedSecond());
        plantCare.setReportedSecond(plantCare.getReportedExposure());
        plantCare.setReportedExposure(sunlightDomain.getReportedSunlight());

        plantCareRepository.save(plantCare);

        System.out.println(plantCare);

        boolean alert = calculateReportedAverage(plantCare);
        System.out.println(alert);
        return alert;
    }

    // Pre-condition: logSunlightExposure() validated input
    public boolean calculateReportedAverage(PlantCare plantCareObject) {
        double avg = 0;
        avg += plantCareObject.getReportedExposure();
        avg += plantCareObject.getReportedSecond();
        avg += plantCareObject.getReportedThird();
        avg /= 3;

        if (Math.abs(plantCareObject.getPlant().getReportedSunlight() - avg) >= 1) {
            return true;
        } else {
            return false;
        }
    }

    public List<PlantCare> getWaterSchedules(String username) {
       User user = userService.authenticate_user(username);

       List<PlantCare> userPlants = plantCareRepository.getByUser(user);

       List<PlantCare> waterSchedules = new ArrayList<>();
       List<PlantCare> nullNext = new ArrayList<>();
       int insert;
       for (PlantCare pc: userPlants) {
           insert = 0;
           if (pc.getWaterNext() == null) {
               nullNext.add(pc);
           } else {
               for (int i = 0; i < waterSchedules.size(); i++) {
                   if (pc.getWaterNext().isBefore(waterSchedules.get(i).getWaterNext())) {
                       insert = i;
                       break;
                   }
               }
               waterSchedules.add(insert, pc);
           }
       }

       waterSchedules.addAll(nullNext);
       return waterSchedules;
    }

    public void updatePlant(plantUpdateDomain domain) {
        Optional<Plant> maybePlant = plantRepository.getById(domain.getId());
        if (!maybePlant.isPresent()) {
            System.out.println("Plant not found");
            throw new UserNotFoundException();
        }
        Plant plant = maybePlant.get();
        plant.setSunlightLevel(domain.getSunlightLevel());
        plant.setMinTemperature(domain.getMinTemperature());
        plant.setSoilType(domain.getSoilType());
        plant.setWaterNeeds(domain.getWaterNeeds());
        plantRepository.save(plant);
    }
    
    public RecommendationDomain getRecommendation(String username) {
        User user = userService.authenticate_user(username);
        String expertise = user.getExpertiseLevel();

        // add plant recommendations in decreasing order of difficulty
        List<Plant> toRecommend = new ArrayList<>();
        if (expertise.equals("Expert") || expertise.equals("Advanced")) {
            List<Plant> expert = plantRepository.findAllByDifficulty("E");
            toRecommend.addAll(expert);
        }

        if (!(expertise.equals("Beginner") || expertise.equals("Novice"))) {
            List<Plant> intermediate = plantRepository.findAllByDifficulty("I");
            toRecommend.addAll(intermediate);
        }

        List<Plant> beginner = plantRepository.findAllByDifficulty("B");
        toRecommend.addAll(beginner);

        RecommendationDomain recommendationDomain = RecommendationDomain.builder()
                .toRecommend(toRecommend)
                .expertiseLevel(user.getExpertiseLevel())
                .build();

        return recommendationDomain;
    }

    /*
     * pre-condition: all information to remain unchanged should be set to default values as shown in constructor
     */
    public PlantInfoDomain editPlantInfo(int plantId, EditPlantDomain newInfo) {
        User user = userService.authenticate_user(newInfo.getUsername());

        Optional<Plant> maybePlant = plantRepository.getById(plantId);
        if (!maybePlant.isPresent()) {
            System.out.println("Plant not found");
            throw new PlantNotFoundException();
        }
        Plant plant = maybePlant.get();

        if (!userService.is_editor(user)) {
            System.out.println("User doesn't have necessary privilege to access.");
            throw new NotEditorException();
        }

        if (!newInfo.getPlantImage().equals("n/a")) {
            plant.setPlantImage(newInfo.getPlantImage());
        }

        if (!newInfo.getPlantName().equals("n/a")) {
            plant.setPlantName(newInfo.getPlantName());
        }

        if (!newInfo.getScientificName().equals("n/a")) {
            plant.setScientificName(newInfo.getScientificName());
        }

        if (!newInfo.getWaterNeeds().equals("n/a")) {
            plant.setWaterNeeds(newInfo.getWaterNeeds());
        }

        if (!newInfo.getSoilType().equals("n/a")) {
            plant.setSoilType(newInfo.getSoilType());
        }

        if (newInfo.getSunlightLevel() != 0) {
            plant.setSunlightLevel(newInfo.getSunlightLevel());
        }

        if (newInfo.getReportedSunlight() != 0) {
            plant.setReportedSunlight(newInfo.getReportedSunlight());
        }

        if (newInfo.getMinTemperature() != 0) {
            plant.setMinTemperature(newInfo.getMinTemperature());
        }

        if (!newInfo.getDifficulty().equals("n/a")) {
            plant.setDifficulty(newInfo.getDifficulty());
        }

        plantRepository.save(plant);

        PlantInfoDomain plantInfoDomain = PlantInfoDomain.builder()
                .plantName(plant.getPlantName())
                .scientificName(plant.getScientificName())
                .plantImage(plant.getPlantImage())
                .waterNeeds(plant.getWaterNeeds())
                .soilType(plant.getSoilType())
                .sunlightLevel(plant.getSunlightLevel())
                .reportedSunlight(plant.getReportedSunlight())
                .minTemperature(plant.getMinTemperature())
                .difficulty(plant.getDifficulty())
                .build();

        return plantInfoDomain;
    }

}
