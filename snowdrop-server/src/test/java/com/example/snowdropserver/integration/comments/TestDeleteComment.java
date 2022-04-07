package com.example.snowdropserver.integration.comments;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestDeleteComment {

    @Test
    public void testDeleteComment() throws Exception {
        TestingUtils.createUserAndExpect("testDeleteComment1",
                "testDeleteComment1@test.com",
                "testDeleteComment1",
                201);

        int postId = TestingUtils.createPostAndExpect("testDeleteComment1",
                "testDeleteComment Title1",
                "testDeleteComment Content1",
                554, // general-tag
                201);

        int commentId = TestingUtils.createCommentAndExpect(postId,
                "testDeleteComment1",
                "testDeleteComment comment1",
                201);

        TestingUtils.deleteCommentAndExpect(commentId, 200);
    }

    @Test
    public void testDeleteCommentFails() throws Exception {
        TestingUtils.createUserAndExpect("testDeleteCommentFails1",
                "testDeleteCommentFails1@test.com",
                "testDeleteCommentFails1",
                201);

        int postId = TestingUtils.createPostAndExpect("testDeleteCommentFails1",
                "testDeleteCommentFails Title1",
                "testDeleteCommentFails Content1",
                554, // general-tag
                201);

        TestingUtils.deleteCommentAndExpect(-1, 400);
    }
}
