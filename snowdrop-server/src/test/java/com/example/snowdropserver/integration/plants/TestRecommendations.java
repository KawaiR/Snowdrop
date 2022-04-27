package com.example.snowdropserver.integration.plants;

import com.example.snowdropserver.Models.Plant;
import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

import java.util.List;

public class TestRecommendations {
    @Test
    public void expert() throws Exception {
//        TestingUtils.createUserAndExpect("expertUser",
//            "expertUser@test.com",
//                "expertUser",
//                201);
        List<Plant> recs = TestingUtils.getRecAndExpect("expertUser", 200);
        assert(recs.size() > 0);

        System.out.println(recs);

    }

    @Test
    public void intermediate() throws Exception {
//        TestingUtils.createUserAndExpect("intermediateUser",
//                "intermediateUser@test.com",
//                "intermediateUser",
//                201);

        List<Plant> recs = TestingUtils.getRecAndExpect("intermediateUser", 200);
        assert(recs.size() > 0);

        System.out.println(recs);
    }

    @Test
    public void beginner() throws Exception {
//        TestingUtils.createUserAndExpect("beginnerUser",
//                "beginnerUser@test.com",
//                "beginnerUser",
//                201);

        List<Plant> recs = TestingUtils.getRecAndExpect("beginnerUser", 200);
        assert(recs.size() > 0);

        System.out.println(recs);
    }
}
