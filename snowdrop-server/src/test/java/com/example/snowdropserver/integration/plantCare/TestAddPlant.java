package com.example.snowdropserver.integration.plantCare;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.Test;

public class TestAddPlant {
    @Test
    public void userPlantSuccess() throws Exception {
        TestingUtils.createUserAndExpect("userPlantSuccess",
                "userPlantSuccess@test.com",
                "userPlantSuccess",
                201);

        TestingUtils.addUserPlant("userPlantSuccess", 3, 201);
    }

    @Test
    public void userPlantFailure() throws Exception {
        TestingUtils.createUserAndExpect("userPlantFailure",
                "userPlantFailure@test.com",
                "userPlantFailure",
                201);

        TestingUtils.addUserPlant("userPlantFail", 4, 400);
    }
}
