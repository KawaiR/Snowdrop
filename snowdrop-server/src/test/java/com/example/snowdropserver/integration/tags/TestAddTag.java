package com.example.snowdropserver.integration.tags;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestAddTag {
    @Test
    public void AddTagSuccess() throws Exception {
        TestingUtils.addTagAndExpect(30,
                201);
    }

    @Test
    public void AddGeneralTagSuccess() throws Exception {
        int plantId = TestingUtils.addNewPlant(null,
                null,
                "general-tag",
                "VL",
                "N",
                3,
                0,
                1,
                201);
        TestingUtils.addTagAndExpect(plantId,
                201);
    }

    @Test
    public void AddAdviceTagSuccess() throws Exception {
        int plantId = TestingUtils.addNewPlant("",
                "",
                "advice-tag",
                "VL",
                "N",
                3,
                0,
                1,
                201);
        TestingUtils.addTagAndExpect(plantId,
                201);
    }

    @Test
    public void AddDuplicateTag() throws Exception {
        TestingUtils.addTagAndExpect(74,
                400);
    }

    @Test
    public void AddTagFailure() throws Exception {
        TestingUtils.addTagAndExpect(-1, 400);
    }
}
