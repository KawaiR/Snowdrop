package com.example.snowdropserver.integration.posts;

import com.example.snowdropserver.Models.Domains.PostInfoDomain;
import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestGetPostInfo {
    @Test
    public void postExists() throws Exception {
        TestingUtils.createUserAndExpect("postExists11",
                "postExists11@test.com",
                "postExists",
                201);
        int postId = TestingUtils.createPostAndExpect("postExists11",
                "postExists11",
                "postExists11",
                64,
                201);
        PostInfoDomain postInfoDomain = TestingUtils.getPostInfoAndExpect(postId,
                200);
        assert(postInfoDomain != null);
        System.out.println(postInfoDomain);
    }

    @Test
    public void postNonExistent() throws Exception {
        TestingUtils.createUserAndExpect("postNonExistent",
                "postNonExistent@test.com",
                "postNonExistent",
                201);
        PostInfoDomain postInfoDomain = TestingUtils.getPostInfoAndExpect(-1,
                400);
        assert(postInfoDomain == null);
        System.out.println(postInfoDomain);
    }

}
