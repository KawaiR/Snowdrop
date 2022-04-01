package com.example.snowdropserver.integration.plantCare;

import com.example.snowdropserver.Models.Domains.PlantCareInfoDomain;
import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestGetPlantCareInfo {
    @Test
    public void getPlantCareSuccess() throws Exception {
        TestingUtils.createUserAndExpect("getPlantCareSuccess111",
                "getPlantCareSuccess111@test.com",
                "getPlantCareSuccess111",
                201);
        int plantCareId = TestingUtils.addUserPlant(4, "getPlantCareSuccess",
                "good", "getPlantCareSuccess", 201);
        PlantCareInfoDomain plantCareInfoDomain = TestingUtils.getPlantCareInfoAndExpect(plantCareId,
                200);
        System.out.println(plantCareInfoDomain);
        assert(plantCareInfoDomain != null);
    }

    @Test
    public void getPlantCareFailure() throws Exception {
        PlantCareInfoDomain plantCareInfoDomain = TestingUtils.getPlantCareInfoAndExpect(-1,
                500);
        assert(plantCareInfoDomain == null);
    }
}
