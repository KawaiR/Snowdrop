package com.example.snowdropserver.integration.comments;

import com.example.snowdropserver.Models.Comment;
import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

import java.util.List;

public class TestGetByPost {
    @Test
    public void postExists() throws Exception {
        TestingUtils.createUserAndExpect("listCommentsSuccess1",
                "listCommentsSuccess1@test.com",
                "listCommentsSuccess1",
                201);
        int postId = TestingUtils.createPostAndExpect("listCommentsSuccess1",
                "listCommentsSuccess1",
                        "listCommentsSuccess1",
                64,
                201);
        TestingUtils.createCommentAndExpect(postId,
                "listCommentsSuccess1",
                "comment content",
                201);
        List<Comment> comments = TestingUtils.getPostCommentsAndExpect(postId, 200);
        assert(comments != null);

        System.out.println(comments);
    }

    @Test
    public void postNotFound() throws Exception {
        List<Comment> comments = TestingUtils.getPostCommentsAndExpect(-1, 400);
        assert(comments == null);
    }
}
