package com.example.snowdropserver.integration.comments;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestCreateComment {
    @Test
    public void createCommentSuccess() throws Exception {
        TestingUtils.createUserAndExpect("createCommentSuccess21",
                "createCommentSuccess21@test.com",
                "createCommentSuccess21",
                201);
        int postId = TestingUtils.createPostAndExpect("createCommentSuccess21",
                "createCommentSuccess21",
                "createCommentSuccess21",
                74,
                201);
        int commentId = TestingUtils.createCommentAndExpect(postId,
                "createCommentSuccess21",
                "createCommentSuccess21",
                201);
        assert(commentId != -1);
    }

    @Test
    public void commentNoPostFound() throws Exception {
        TestingUtils.createUserAndExpect("commentNoPostFound21",
                "commentNoPostFound21@test.com",
                "commentNoPostFound21",
                201);
        int commentId = TestingUtils.createCommentAndExpect(-1,
                "commentNoPostFound21",
                "commentNoPostFound21",
                400);
        assert(commentId == -1);
    }
}
