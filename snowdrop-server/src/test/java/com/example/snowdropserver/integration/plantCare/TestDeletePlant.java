package com.example.snowdropserver.integration.plantCare;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestDeletePlant {

    @Test
    public void testDeleteOnlyPlant() throws Exception {
        TestingUtils.createUserAndExpect("testDeleteOnlyPlant",
                "testDeleteOnlyPlant@test.com",
                "testDeleteOnlyPlant",
                201);

        int plantCareId = TestingUtils.addUserPlant(1,
                "testDeleteOnlyPlant",
                "good",
                "testDeleteOnlyPlant",
                201);

        TestingUtils.deletePlantAndExpect("testDeleteOnlyPlant",
                plantCareId,
                200);
    }

    @Test
    public void testDeleteFromTwo() throws Exception {
        TestingUtils.createUserAndExpect("testDeleteFromTwo",
                "testDeleteFromTwo@test.com",
                "testDeleteFromTwo",
                201);

        int plantCare1 = TestingUtils.addUserPlant(1,
                "testDeleteFromTwo",
                "good",
                "Plant 1",
                201);

        int plantCare2 = TestingUtils.addUserPlant(5,
                "testDeleteFromTwo",
                "good",
                "Plant 2",
                201);

        TestingUtils.deletePlantAndExpect("testDeleteFromTwo",
                plantCare1,
                200);
    }

    @Test
    public void testDeleteFromThree() throws Exception {
        TestingUtils.createUserAndExpect("testDeleteFromThree",
                "testDeleteFromThree@test.com",
                "testDeleteFromThree",
                201);

        int plantCare1 = TestingUtils.addUserPlant(1,
                "testDeleteFromThree",
                "good",
                "Plant 1",
                201);

        int plantCare2 = TestingUtils.addUserPlant(5,
                "testDeleteFromThree",
                "",
                "Plant 2",
                201);

        int plantCare3 = TestingUtils.addUserPlant(10,
                "testDeleteFromThree",
                "good",
                "Plant 3",
                201);

        TestingUtils.deletePlantAndExpect("testDeleteFromThree",
                plantCare2,
                200);
    }

    @Test
    public void testDeleteFails() throws Exception {
        TestingUtils.createUserAndExpect("testDeleteFails",
                "testDeleteFails@test.com",
                "testDeleteFails",
                201);

        int plantCare1 = TestingUtils.addUserPlant(1,
                "testDeleteFails",
                "good",
                "Plant 1",
                201);

        TestingUtils.deletePlantAndExpect("testDeleteFails",
                -1,
                400);
    }
}
