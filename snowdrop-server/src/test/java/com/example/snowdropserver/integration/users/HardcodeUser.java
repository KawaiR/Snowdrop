package com.example.snowdropserver.integration.users;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class HardcodeUser {
    @Test
    public void dummy() throws Exception {
        TestingUtils.createUserAndExpect("dummyUser",
                "dummyUser@test.com",
                "dummyUser",
                201);
        TestingUtils.updateUserAndExpect("dummyUser",
                200,
                "Beginner",
                0,
                200);
    }
}
