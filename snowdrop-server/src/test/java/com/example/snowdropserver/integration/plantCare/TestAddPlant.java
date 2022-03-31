package com.example.snowdropserver.integration.plantCare;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.Test;

public class TestAddPlant {
    @Test
    public void userPlantSuccess() throws Exception {
        TestingUtils.createUserAndExpect("userPlantSuccess5",
                "userPlantSuccess5@test.com",
                "userPlantSuccess5",
                201);

        TestingUtils.addUserPlant(1, "userPlantSuccess5", "good",
                "someNickname", 201);
    }

    @Test
    public void userPlantFailure() throws Exception {
        TestingUtils.createUserAndExpect("userPlantFailure",
                "userPlantFailure@test.com",
                "userPlantFailure",
                201);

        TestingUtils.addUserPlant(4, "userPlantFail", "medium",
                "", 400);
    }
}
