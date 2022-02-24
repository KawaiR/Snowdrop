package com.example.snowdropserver.integration.plantCare;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.Test;

public class TestAddPlant {
    @Test
    public void userPlantSuccess() throws Exception {
        TestingUtils.createUserAndExpect("userPlantSuccess3",
                "userPlantSuccess3@test.com",
                "userPlantSuccess",
                201);

        TestingUtils.addUserPlant("userPlantSuccess1", 1, 200);
    }
}
