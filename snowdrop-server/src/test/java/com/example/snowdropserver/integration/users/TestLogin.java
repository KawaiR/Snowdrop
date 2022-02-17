package com.example.snowdropserver.integration.users;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.Test;

public class TestLogin {

    @Test
    public void loginSuccess() throws Exception {
        TestingUtils.createUserAndExpect("loginSuccess",
                "loginSuccess@Test.com",
                "loginSuccess",
                201);

        TestingUtils.loginAndExpect("loginSuccess@Test.com",
                "loginSuccess",
                200);
    }

    @Test
    public void loginFailEmail() throws Exception {
        TestingUtils.createUserAndExpect("loginFailEmail",
                "loginFailEmail@test.com",
                "loginFailEmail",
                201);

        TestingUtils.loginAndExpect("loginFailEmail@test1.com",
                "loginFailEmail",
                400);
    }

    @Test
    public void loginFailPassword() throws Exception {
        TestingUtils.createUserAndExpect("loginFailPassword",
                "loginFailPassword@test.com",
                "loginFailPassword",
                201);

        TestingUtils.loginAndExpect("loginFailPassword@test.com",
                "loginFailPassword11",
                400);
    }
}
