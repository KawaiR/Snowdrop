package com.example.snowdropserver.integration.plants;

import com.example.snowdropserver.Models.Domains.PlantInfoDomain;
import com.example.snowdropserver.integration.TestingUtils;
import org.junit.Test;

public class TestGetPlantInfo {

    @Test
    public void TestPlantInfoExists() throws Exception {
        PlantInfoDomain plantInfoDomain = TestingUtils.getPlantInfoAndExpect(1, 200);
        System.out.println(plantInfoDomain);
    }

    @Test
    public void TestPlantInfoNotThere() throws Exception {
        PlantInfoDomain plantInfoDomain = TestingUtils.getPlantInfoAndExpect(-1, 400);
        System.out.println(plantInfoDomain);
    }
}
