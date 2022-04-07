package com.example.snowdropserver.integration.comments;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestDeleteComment {

    @Test
    public void testDeleteComment() throws Exception {
        TestingUtils.createUserAndExpect("testDeleteComment",
                "testDeleteComment@test.com",
                "testDeleteComment",
                201);

        int postId = TestingUtils.createPostAndExpect("testDeleteComment",
                "testDeleteComment Title",
                "testDeleteComment Content",
                56, // general-tag
                201);

        int commentId = TestingUtils.createCommentAndExpect(postId,
                "testDeleteComment",
                "testDeleteComment comment",
                201);

        TestingUtils.deleteCommentAndExpect(commentId, 201);
    }

    @Test
    public void testDeleteCommentFails() throws Exception {
        TestingUtils.createUserAndExpect("testDeleteCommentFails",
                "testDeleteCommentFails@test.com",
                "testDeleteCommentFails",
                201);

        int postId = TestingUtils.createPostAndExpect("testDeleteCommentFails",
                "testDeleteCommentFails Title",
                "testDeleteCommentFails Content",
                56, // general-tag
                201);

        TestingUtils.deleteCommentAndExpect(-1, 400);
    }
}
