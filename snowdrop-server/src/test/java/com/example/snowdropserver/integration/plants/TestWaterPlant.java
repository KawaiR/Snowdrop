package com.example.snowdropserver.integration.plants;

import com.example.snowdropserver.Models.Domains.WaterPlantDomain;
import com.example.snowdropserver.integration.TestingUtils;
import liquibase.pro.packaged.L;
import org.junit.Test;

import java.time.LocalDateTime;

public class TestWaterPlant {

    @Test
    public void waterNewPlant() throws Exception {
        TestingUtils.createUserAndExpect("waterNewPlant",
                "waterNewPlant@test.com",
                "waterNewPlant",
                201);

        int plantCareId = TestingUtils.addUserPlant("waterNewPlant",
                10,
                201);

        WaterPlantDomain next = TestingUtils.waterPlant("waterNewPlant",
                plantCareId,
                200);

        System.out.println(next);
    }

    @Test
    public void waterPlantTwice() throws Exception {
        TestingUtils.createUserAndExpect("waterPlantTwice",
                "waterPlantTwice@test.com",
                "waterPlantTwice",
                201);

        int plantCareId = TestingUtils.addUserPlant("waterPlantTwice",
                10,
                201);

        WaterPlantDomain next = TestingUtils.waterPlant("waterPlantTwice",
                plantCareId,
                200);

        next = TestingUtils.waterPlant("waterPlantTwice",
                plantCareId,
                200);

        System.out.println(next);
    }

    @Test
    public void waterPlantLow() throws Exception {
        TestingUtils.createUserAndExpect("waterPlantLow",
                "waterPlantLow@test.com",
                "waterPlantLow",
                201);

        int plantCareId = TestingUtils.addUserPlant("waterPlantLow",
                5,
                201);

        WaterPlantDomain next = TestingUtils.waterPlant("waterPlantLow",
                plantCareId,
                200);

        System.out.println(next);
    }

    @Test
    public void waterPlantVeryLow() throws Exception {
        TestingUtils.createUserAndExpect("waterPlantVeryLow",
                "waterPlantVeryLow@test.com",
                "waterPlantVeryLow",
                201);

        int plantCareId = TestingUtils.addUserPlant("waterPlantVeryLow",
                20,
                201);

        WaterPlantDomain next = TestingUtils.waterPlant("waterPlantVeryLow",
                plantCareId,
                200);

        System.out.println(next);
    }

    @Test
    public void waterPlantModerate() throws Exception {
        TestingUtils.createUserAndExpect("waterPlantModerate",
                "waterPlantModerate@test.com",
                "waterPlantModerate",
                201);

        int plantCareId = TestingUtils.addUserPlant("waterPlantModerate",
                15,
                201);

        WaterPlantDomain next = TestingUtils.waterPlant("waterPlantModerate",
                plantCareId,
                200);

        System.out.println(next);
    }
}
