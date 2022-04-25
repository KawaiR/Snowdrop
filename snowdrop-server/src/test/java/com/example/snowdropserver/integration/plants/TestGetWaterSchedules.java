package com.example.snowdropserver.integration.plants;

import com.example.snowdropserver.Models.Domains.WaterSchedulesDomain;
import com.example.snowdropserver.Models.PlantCare;
import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

import java.util.List;

public class TestGetWaterSchedules {
    @Test
    public void getAllWaterSchedules() throws Exception {
        TestingUtils.createUserAndExpect("printAllWaterSchedules3",
                "printAllWaterSchedules3@test.com",
                "printAllWaterSchedules3",
                201);
        int p1 = TestingUtils.addUserPlant(74, "printAllWaterSchedules3", "good",
                "plant 1", 201);
        int p2 = TestingUtils.addUserPlant(84, "printAllWaterSchedules3", "good",
                "plant 2", 201);
        int p3 = TestingUtils.addUserPlant(94, "printAllWaterSchedules3", "good",
                "plant 3", 201);

        TestingUtils.waterPlant("printAllWaterSchedules3", p1, 200);
        TestingUtils.waterPlant("printAllWaterSchedules3", p2, 200);
        TestingUtils.waterPlant("printAllWaterSchedules3", p3, 200);

        List<PlantCare> waterSchedules = TestingUtils.getWaterSchedulesAndExpect(
                "printAllWaterSchedules3",
                200);
        assert(waterSchedules.size() == 3);
        System.out.println(waterSchedules);
    }
}
