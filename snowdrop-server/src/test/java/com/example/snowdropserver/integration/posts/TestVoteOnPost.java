package com.example.snowdropserver.integration.posts;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestVoteOnPost {
    @Test
    public void testUpvote() throws Exception {
        TestingUtils.createUserAndExpect("testUpvote4",
                "testUpvote4@test.com",
                "testUpvote4",
                201);
        int postId = TestingUtils.createPostAndExpect("testUpvote4",
                "testUpvote4",
                "testUpvote4",
                74,
                201);
        TestingUtils.voteAndExpect(postId,
                "testUpvote4",
                1,
                200);
    }

    @Test
    public void testDownvote() throws Exception {
        TestingUtils.createUserAndExpect("testDownvote3",
                "testDownvote3@test.com",
                "testDownvote3",
                201);
        int postId = TestingUtils.createPostAndExpect("testDownvote3",
                "testDownvote3",
                "testDownvote3",
                74,
                201);
        TestingUtils.voteAndExpect(postId,
                "testDownvote3",
                0,
                200);
    }

    @Test
    public void testUpvoteThenDownvote() throws Exception {
        TestingUtils.createUserAndExpect("testUpvoteThenDownvote",
                "testUpvoteThenDownvote@test.com",
                "testUpvoteThenDownvote",
                201);
        int postId = TestingUtils.createPostAndExpect("testUpvoteThenDownvote",
                "testUpvoteThenDownvote",
                "testUpvoteThenDownvote",
                74,
                201);
        TestingUtils.voteAndExpect(postId,
                "testUpvoteThenDownvote",
                1,
                200);
        TestingUtils.voteAndExpect(postId,
                "testUpvoteThenDownvote",
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
                74,
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
        TestingUtils.createUserAndExpect("testUpvoteTwice",
                "testUpvoteTwice@test.com",
                "testUpvoteTwice",
                201);
        int postId = TestingUtils.createPostAndExpect("testUpvoteTwice",
                "testUpvoteTwice",
                "testUpvoteTwice",
                3,
                201);
        TestingUtils.voteAndExpect(postId,
                "testUpvoteTwice",
                1,
                200);
        TestingUtils.voteAndExpect(postId,
                "testUpvoteTwice",
                1,
                200);
    }

    @Test
    public void testDownvoteTwice() throws Exception {
        TestingUtils.createUserAndExpect("testDownvoteTwice2",
                "testDownvoteTwice2@test.com",
                "testDownvoteTwice2",
                201);
        int postId = TestingUtils.createPostAndExpect("testDownvoteTwice2",
                "testDownvoteTwice2",
                "testDownvoteTwice2",
                3,
                201);
        TestingUtils.voteAndExpect(postId,
                "testDownvoteTwice2",
                0,
                200);
        TestingUtils.voteAndExpect(postId,
                "testDownvoteTwice2",
                0,
                200);
    }
}
