package com.example.snowdropserver.integration.posts;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestDeletePost {
    @Test
    public void deletePostSuccess() throws Exception {
        TestingUtils.createUserAndExpect("deletePostSuccess1", "deletePostSuccess1@test.com",
                "deletePostSuccess1", 201);
        int postId = TestingUtils.createPostAndExpect("deletePostSuccess1", "deletePostSuccess1",
                "deletePostSuccess1", 64, 201);
        TestingUtils.deletePostAndExpect(postId, "deletePostSuccess1", 200);
    }

    @Test
    public void deletePostFailure() throws Exception {
        TestingUtils.createUserAndExpect("deletePostFailure1", "deletePostFailure1@test.com",
                "deletePostFailure1", 201);
        TestingUtils.deletePostAndExpect(-1, "deletePostFailure1", 400);
    }

    @Test
    public void deletePostNotUser() throws Exception {
        TestingUtils.createUserAndExpect("deletePostNotUser1", "deletePostNotUser1@test.com",
                "deletePostNotUser1", 201);
        TestingUtils.createUserAndExpect("deletePostUser1", "deletePostUser1@test.com",
                "deletePostUser1", 201);
        int postId = TestingUtils.createPostAndExpect("deletePostUser1", "deletePostNotUser1",
                "deletePostNotUser1", 544, 201);
        TestingUtils.deletePostAndExpect(postId,"deletePostNotUser1", 400);
    }
}
