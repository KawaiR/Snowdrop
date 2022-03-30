package com.example.snowdropserver.integration.posts;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.Test;

public class TestCreatePost {

    @Test
    public void createPostSuccess() throws Exception {
        TestingUtils.createUserAndExpect("createPostSuccess",
                "createPostSuccess@test.com",
                "createPostSuccess",
                201);

        int postId = TestingUtils.createPostAndExpect("createPostSuccess",
                "createPostSuccess",
                "createPostSuccess",
                1,
                201);

        System.out.println("postId: " + postId);
    }

    @Test
    public void createPostNoUser() throws Exception {
        int postId = TestingUtils.createPostAndExpect("createPostNoUser",
                "createPostNoUser",
                "createPostNoUser",
                1,
                400);

        System.out.println("postId: " + postId);
    }

    @Test
    public void createPostNoPlant() throws Exception {
        TestingUtils.createUserAndExpect("createPostNoPlant",
                "createPostNoPlant@test.com",
                "createPostNoPlant",
                201);

        int postId = TestingUtils.createPostAndExpect("createPostNoPlant",
                "createPostNoPlant",
                "createPostNoPlant",
                -1,
                400);

        System.out.println("postId: " + postId);
    }
}
