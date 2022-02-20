package com.example.snowdropserver.integration.users;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.Test;

public class TestUpdatePassword {

    @Test
    public void updatePasswordSuccessful() throws Exception {
        TestingUtils.createUserAndExpect("updatePasswordSuccessful",
                "updatePasswordSuccessful@test.com",
                "updatePasswordSuccessful",
                201);

        TestingUtils.updatePasswordAndExpect("updatePasswordSuccessful@test.com",
                "updatePasswordSuccessful",
                "newPassword!",
                200);
    }

    @Test
    public void updatePasswordMismatch() throws Exception {
        TestingUtils.createUserAndExpect("updatePasswordMismatch",
                "updatePasswordMismatch@test.com",
                "updatePasswordMismatch",
                201);

        TestingUtils.updatePasswordAndExpect("updatePasswordMismtach@test.com",
                "updatePasswordFailure",
                "newPassword!",
                400);
    }

}
