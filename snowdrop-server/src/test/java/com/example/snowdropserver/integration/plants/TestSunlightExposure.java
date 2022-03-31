package com.example.snowdropserver.integration.plants;

import com.example.snowdropserver.Models.Domains.WaterPlantDomain;
import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestSunlightExposure {

    @Test
    public void logFullShade() throws Exception {
        TestingUtils.createUserAndExpect("logFullShade11",
                "logFullShade11@test.com",
                "logFullShade",
                201);

        int plantCareId = TestingUtils.addUserPlant(3,
                "logFullShade11",
                "good",
                "random",
                201);

        TestingUtils.reportedExposureAndExpect(plantCareId,
                "logFullShade11",
                1,
                200);
    }

    @Test
    public void logPartialShade() throws Exception {
        TestingUtils.createUserAndExpect("logPartialShade1",
                "logPartialShade1@test.com",
                "logPartialShade",
                201);

        int plantCareId = TestingUtils.addUserPlant(3,
                "logPartialShade1",
                "good",
                "random",
                201);

        TestingUtils.reportedExposureAndExpect(plantCareId,
                "logPartialShade1",
                2,
                200);
    }

    @Test
    public void logNoShade() throws Exception {
        TestingUtils.createUserAndExpect("logNoShade1",
                "logNoShade1@test.com",
                "logNoShade",
                201);

        int plantCareId = TestingUtils.addUserPlant(3,
                "logNoShade1",
                "good",
                "random",
                201);

        TestingUtils.reportedExposureAndExpect(plantCareId,
                "logNoShade1",
                2,
                200);
    }

    @Test
    public void raiseAlert() throws Exception {
        TestingUtils.createUserAndExpect("raiseAlert111",
                "raiseAlert111@test.com",
                "logNoShade",
                201);

        int plantCareId = TestingUtils.addUserPlant(3,
                "raiseAlert111",
                "good",
                "random",
                201);

        TestingUtils.reportedExposureAndExpect(plantCareId,
                "raiseAlert111",
                3,
                200);

        TestingUtils.reportedExposureAndExpect(plantCareId,
                "raiseAlert111",
                3,
                200);

        boolean alert = TestingUtils.reportedExposureAndExpect(plantCareId,
                "raiseAlert111",
                3,
                200);

        assert(alert);
    }

    @Test
    public void noAlert() throws Exception {
        TestingUtils.createUserAndExpect("noAlert11",
                "noAlert11@test.com",
                "noAlert11",
                201);

        int plantCareId = TestingUtils.addUserPlant(3,
                "noAlert11",
                "good",
                "random",
                201);

        TestingUtils.reportedExposureAndExpect(plantCareId,
                "noAlert11",
                1,
                200);

        TestingUtils.reportedExposureAndExpect(plantCareId,
                "noAlert11",
                2,
                200);

        boolean alert = TestingUtils.reportedExposureAndExpect(plantCareId,
                "noAlert11",
                1,
                200);

        assert(!alert);
    }
}
