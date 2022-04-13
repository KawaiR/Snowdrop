package com.example.snowdropserver.integration.plants;

import com.example.snowdropserver.Models.Domains.WaterSchedulesDomain;
import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

import java.util.List;

public class TestGetWaterSchedules {
    @Test
    public void getAllWaterSchedules() throws Exception {
        TestingUtils.createUserAndExpect("printAllWaterSchedules",
                "printAllWaterSchedules@test.com",
                "printAllWaterSchedules",
                201);
        TestingUtils.addUserPlant(74, "printAllWaterSchedules", "good",
                "plant 1", 201);
        TestingUtils.addUserPlant(84, "printAllWaterSchedules", "good",
                "plant 2", 201);
        TestingUtils.addUserPlant(94, "printAllWaterSchedules", "good",
                "plant 3", 201);

        List<WaterSchedulesDomain> waterSchedules = TestingUtils.getWaterSchedulesAndExpect(
                "printAllWaterSchedules",
                200);
        assert(waterSchedules.size() == 3);
        System.out.println(waterSchedules);
    }
}
