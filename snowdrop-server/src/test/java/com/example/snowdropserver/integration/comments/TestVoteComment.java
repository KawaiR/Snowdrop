package com.example.snowdropserver.integration.comments;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestVoteComment {
    @Test
    public void testCommentUpvote() throws Exception {
        TestingUtils.createUserAndExpect("testCommentUpvote2",
                "testCommentUpvote2@test.com",
                "testCommentUpvote1",
                201);
        int postId = TestingUtils.createPostAndExpect("testCommentUpvote2",
                "testCommentUpvote1",
                "testCommentUpvote1",
                30,
                201);
        int commentId = TestingUtils.createCommentAndExpect(postId,
                "testCommentUpvote2",
                "testCommentUpvote1",
                201);
        TestingUtils.voteCommentAndExpect(commentId,
                "testCommentUpvote2",
                1,
                200);
    }

    @Test
    public void testCommentDownvote() throws Exception {
        TestingUtils.createUserAndExpect("testCommentDownvote",
                "testCommentDownvote@test.com",
                "testCommentDownvote",
                201);
        int postId = TestingUtils.createPostAndExpect("testCommentDownvote",
                "testCommentDownvote",
                "testCommentDownvote",
                30,
                201);
        int commentId = TestingUtils.createCommentAndExpect(postId,
                "testCommentDownvote",
                "testCommentDownvote",
                201);
        TestingUtils.voteCommentAndExpect(commentId,
                "testCommentDownvote",
                0,
                200);
    }

    @Test
    public void testCommentUpvoteThenDownvote() throws Exception {
        TestingUtils.createUserAndExpect("testCommentUpvoteThenDownvote",
                "testCommentUpvoteThenDownvote@test.com",
                "testCommentUpvoteThenDownvote",
                201);
        int postId = TestingUtils.createPostAndExpect("testCommentUpvoteThenDownvote",
                "testCommentUpvoteThenDownvote",
                "testCommentUpvoteThenDownvote",
                30,
                201);
        int commentId = TestingUtils.createCommentAndExpect(postId,
                "testCommentUpvoteThenDownvote",
                "testCommentUpvoteThenDownvote",
                201);
        TestingUtils.voteCommentAndExpect(commentId,
                "testCommentUpvoteThenDownvote",
                1,
                200);
        TestingUtils.voteCommentAndExpect(commentId,
                "testCommentUpvoteThenDownvote",
                0,
                200);
    }

    @Test
    public void testCommentDownvoteThenUpvote() throws Exception {
        TestingUtils.createUserAndExpect("testCommentDownvoteThenUpvote",
                "testCommentDownvoteThenUpvote@test.com",
                "testCommentDownvoteThenUpvote",
                201);
        int postId = TestingUtils.createPostAndExpect("testCommentDownvoteThenUpvote",
                "testCommentDownvoteThenUpvote",
                "testCommentDownvoteThenUpvote",
                30,
                201);
        int commentId = TestingUtils.createCommentAndExpect(postId,
                "testCommentDownvoteThenUpvote",
                "testCommentDownvoteThenUpvote",
                201);
        TestingUtils.voteCommentAndExpect(commentId,
                "testCommentDownvoteThenUpvote",
                0,
                200);
        TestingUtils.voteCommentAndExpect(commentId,
                "testCommentDownvoteThenUpvote",
                1,
                200);
    }

    @Test
    public void testCommentUpvoteTwice() throws Exception {
        TestingUtils.createUserAndExpect("testCommentUpvoteTwice",
                "testCommentUpvoteTwice@test.com",
                "testCommentUpvoteTwice",
                201);
        int postId = TestingUtils.createPostAndExpect("testCommentUpvoteTwice",
                "testCommentUpvoteTwice",
                "testCommentUpvoteTwice",
                30,
                201);
        int commentId = TestingUtils.createCommentAndExpect(postId,
                "testCommentUpvoteTwice",
                "testCommentUpvoteTwice",
                201);
        TestingUtils.voteCommentAndExpect(commentId,
                "testCommentUpvoteTwice",
                1,
                200);
        TestingUtils.voteCommentAndExpect(commentId,
                "testCommentUpvoteTwice",
                1,
                200);
    }

    @Test
    public void testCommentDownvoteTwice() throws Exception {
        TestingUtils.createUserAndExpect("testCommentDownvoteTwice",
                "testCommentDownvoteTwice@test.com",
                "testCommentDownvoteTwice",
                201);
        int postId = TestingUtils.createPostAndExpect("testCommentDownvoteTwice",
                "testCommentDownvoteTwice",
                "testCommentDownvoteTwice",
                30,
                201);
        int commentId = TestingUtils.createCommentAndExpect(postId,
                "testCommentDownvoteTwice",
                "testCommentDownvoteTwice",
                201);
        TestingUtils.voteCommentAndExpect(commentId,
                "testCommentDownvoteTwice",
                0,
                200);
        TestingUtils.voteCommentAndExpect(commentId,
                "testCommentDownvoteTwice",
                0,
                200);
    }
}
