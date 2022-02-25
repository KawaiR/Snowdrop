package com.example.snowdropserver.integration.plantCare;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.Test;

public class TestUpdateNickname {

    @Test
    public void updateNicknameSuccess() throws Exception{
        TestingUtils.createUserAndExpect("updateNicknameSuccess",
                "updateNicknameSuccess@test.com",
                "updateNicknameSuccess",
                201);

        int plantCare = TestingUtils.addUserPlant(5,"updateNicknameSuccess",
                "good",
                "nickname",
                201);

        TestingUtils.updateNickName("updateNicknameSuccess",
                plantCare,
                "someNickname",
                200);
    }

    @Test
    public void noPlantToChange() throws Exception {
        TestingUtils.createUserAndExpect("noPlantToChange",
                "noPlantToChange@test.com",
                "noPlantToChange",
                201);

        TestingUtils.updateNickName("noPlantToChange",
                6,
                "noPlantToChange",
                400);
    }

    @Test
    public void noUserFound() throws Exception {
        TestingUtils.updateNickName("noUserFound",
                6,
                "noPlantToChange",
                400);
    }

    @Test
    public void changeNicknameTwice() throws Exception {
        TestingUtils.createUserAndExpect("changeNicknameTwice",
                "changeNicknameTwice@test.com",
                "changeNicknameTwice",
                201);

        int plantCare = TestingUtils.addUserPlant(4, "changeNicknameTwice",
                "medium",
                "someNickname",
                201);

        TestingUtils.updateNickName("changeNicknameTwice",
                plantCare,
                "newNickname",
                200);

        TestingUtils.updateNickName("changeNicknameTwice",
                plantCare,
                "secondNickname",
                200);
    }
}
