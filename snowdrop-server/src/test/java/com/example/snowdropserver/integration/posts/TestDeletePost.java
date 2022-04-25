package com.example.snowdropserver.integration.posts;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestDeletePost {
    @Test
    public void deletePostSuccess() throws Exception {
        TestingUtils.createUserAndExpect("deletePostSuccess2", "deletePostSuccess2@test.com",
                "deletePostSuccess2", 201);
        int postId = TestingUtils.createPostAndExpect("deletePostSuccess2", "deletePostSuccess2",
                "deletePostSuccess2", 64, 201);
        TestingUtils.deletePostAndExpect(postId, "deletePostSuccess2", 200);
    }

    @Test
    public void deletePostFailure() throws Exception {
        TestingUtils.createUserAndExpect("deletePostFailure11", "deletePostFailure11@test.com",
                "deletePostFailure11", 201);
        TestingUtils.deletePostAndExpect(-1, "deletePostFailure11", 400);
    }

    @Test
    public void deletePostNotUser() throws Exception {
        TestingUtils.createUserAndExpect("deletePostNotUser11", "deletePostNotUser11@test.com",
                "deletePostNotUser11", 201);
        TestingUtils.createUserAndExpect("deletePostUser111", "deletePostUser111@test.com",
                "deletePostUser111", 201);
        int postId = TestingUtils.createPostAndExpect("deletePostUser11", "deletePostNotUser11",
                "deletePostNotUser11", 544, 201);
        TestingUtils.deletePostAndExpect(postId,"deletePostNotUser11", 400);
    }
}
