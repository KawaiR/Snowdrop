package com.example.snowdropserver.integration.users;

import com.example.snowdropserver.Models.Domains.UserInfoDomain;
import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestGetUserInfo {
    @Test
    public void getUserInfoSuccess() throws Exception {
//        TestingUtils.createUserAndExpect("getUserInfoSuccess",
//                "getUserInfoSuccess@Test.com",
//                "getUserInfoSuccess",
//                201);

        UserInfoDomain userInfoDomain = TestingUtils.getUserInfoAndExpect("getUserInfoSuccess",
                200);

        assert(userInfoDomain != null);
        System.out.println(userInfoDomain);
    }

    @Test
    public void getUserInfoFailure() throws Exception {
        UserInfoDomain userInfoDomain = TestingUtils.getUserInfoAndExpect("getUserInfoFailure",
                400);
        assert(userInfoDomain == null);
    }
}
