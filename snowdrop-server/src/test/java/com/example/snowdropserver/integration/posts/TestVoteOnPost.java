package com.example.snowdropserver.integration.posts;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestVoteOnPost {
    @Test
    public void testUpvote() throws Exception {
        TestingUtils.createUserAndExpect("testUpvote8",
                "testUpvote8@test.com",
                "testUpvote8",
                201);
        int postId = TestingUtils.createPostAndExpect("testUpvote8",
                "testUpvote8",
                "testUpvote8",
                74,
                201);
        TestingUtils.voteAndExpect(postId,
                "testUpvote8",
                0,
                200);
    }

    @Test
    public void testDownvote() throws Exception {
        TestingUtils.createUserAndExpect("testDownvote1",
                "testDownvote1@test.com",
                "testDownvote1",
                201);
        int postId = TestingUtils.createPostAndExpect("testDownvote1",
                "testDownvote1",
                "testDownvote1",
                64,
                201);
        TestingUtils.voteAndExpect(postId,
                "testDownvote1",
                0,
                200);
    }

    @Test
    public void testUpvoteThenDownvote() throws Exception {
        TestingUtils.createUserAndExpect("testUpvoteThenDownvote4",
                "testUpvoteThenDownvote4@test.com",
                "testUpvoteThenDownvote4",
                201);
        int postId = TestingUtils.createPostAndExpect("testUpvoteThenDownvote4",
                "testUpvoteThenDownvote4",
                "testUpvoteThenDownvote4",
                84,
                201);
        TestingUtils.voteAndExpect(postId,
                "testUpvoteThenDownvote4",
                1,
                200);
        TestingUtils.voteAndExpect(postId,
                "testUpvoteThenDownvote4",
                0,
                200);
    }

    @Test
    public void testDownvoteThenUpvote() throws Exception {
        TestingUtils.createUserAndExpect("testDownvoteThenUpvote",
                "testDownvoteThenUpvote@test.com",
                "testDownvoteThenUpvote",
                201);
        int postId = TestingUtils.createPostAndExpect("testDownvoteThenUpvote",
                "testDownvoteThenUpvote",
                "testDownvoteThenUpvote",
                94,
                201);
        TestingUtils.voteAndExpect(postId,
                "testDownvoteThenUpvote",
                0,
                200);
        TestingUtils.voteAndExpect(postId,
                "testDownvoteThenUpvote",
                1,
                200);
    }

    @Test
    public void testUpvoteTwice() throws Exception {
        TestingUtils.createUserAndExpect("testUpvoteTwice22",
                "testUpvoteTwic22@test.com",
                "testUpvoteTwice22",
                201);
        int postId = TestingUtils.createPostAndExpect("testUpvoteTwice22",
                "testUpvoteTwice22",
                "testUpvoteTwice22",
                54,
                201);
        TestingUtils.voteAndExpect(postId,
                "testUpvoteTwice22",
                1,
                200);
        TestingUtils.voteAndExpect(postId,
                "testUpvoteTwice22",
                1,
                200);
    }

    @Test
    public void testDownvoteTwice() throws Exception {
        TestingUtils.createUserAndExpect("testDownvoteTwice22",
                "testDownvoteTwice22@test.com",
                "testDownvoteTwice22",
                201);
        int postId = TestingUtils.createPostAndExpect("testDownvoteTwice22",
                "testDownvoteTwice22",
                "testDownvoteTwice22",
                44,
                201);
        TestingUtils.voteAndExpect(postId,
                "testDownvoteTwice22",
                0,
                200);
        TestingUtils.voteAndExpect(postId,
                "testDownvoteTwice22",
                0,
                200);
    }
}
