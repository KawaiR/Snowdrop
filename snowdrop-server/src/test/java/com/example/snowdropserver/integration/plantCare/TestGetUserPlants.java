package com.example.snowdropserver.integration.plantCare;

import com.example.snowdropserver.Models.Domains.UserPlantsDomain;
import com.example.snowdropserver.Models.PlantCare;
import com.example.snowdropserver.integration.TestingUtils;
import org.junit.Test;

import java.util.List;

public class TestGetUserPlants {
    @Test
    public void userNoPlants() throws Exception {
        TestingUtils.createUserAndExpect("userNoPlants",
                "userNoPlants@test.com",
                "userNoPlants",
                201);

        UserPlantsDomain userPlantsDomain = TestingUtils.getUserPlantsAndExpect("userNoPlants",
                200);
        assert(userPlantsDomain.getCaredFor().isEmpty());
    }

    @Test
    public void userOnePlant() throws Exception {
        TestingUtils.createUserAndExpect("userOnePlant",
                "userOnePlant@test.com",
                "userOnePlant",
                201);

        TestingUtils.addUserPlant("userOnePlant", 4, 201);
        UserPlantsDomain userPlantsDomain = TestingUtils.getUserPlantsAndExpect("userOnePlant",
                200);

        assert(userPlantsDomain.getCaredFor().size() == 1);
    }

    @Test
    public void userMultiplePlants() throws Exception {
        TestingUtils.createUserAndExpect("userMultiplePlants",
                "userMultiplePlants@test.com",
                "userMultiplePlants",
                201);

        TestingUtils.addUserPlant("userMultiplePlants", 4, 201);
        TestingUtils.addUserPlant("userMultiplePlants", 10, 201);

        UserPlantsDomain userPlantsDomain = TestingUtils.getUserPlantsAndExpect("userMultiplePlants",
                200);

        assert(userPlantsDomain.getCaredFor().size() == 2);
    }

    @Test
    public void noSuchUser() throws Exception {
        UserPlantsDomain userPlantsDomain = TestingUtils.getUserPlantsAndExpect("noSuchUser",
                400);
    }
}
