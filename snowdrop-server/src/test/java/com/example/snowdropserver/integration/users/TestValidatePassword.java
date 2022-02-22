package com.example.snowdropserver.integration.users;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.Test;

public class TestValidatePassword {

    @Test
    public void validatePasswordSuccess() throws Exception {
        TestingUtils.createUserAndExpect("validatePasswordSuccess",
                "validatePasswordSuccess@test.com",
                "validatePasswordSuccess",
                201);

        TestingUtils.validatePasswordAndExpect("validatePasswordSuccess@test.com",
                "validatePasswordSuccess",
                200);
    }

    @Test
    public void validatePasswordFailure() throws Exception {
        TestingUtils.createUserAndExpect("validatePasswordFailure1=",
                "validatePasswordFailure@test.com",
                "validatePasswordFailure",
                201);

        TestingUtils.validatePasswordAndExpect("validatePasswordFailure@test.com",
                "validatePasswordSuccess",
                400);
    }
}
