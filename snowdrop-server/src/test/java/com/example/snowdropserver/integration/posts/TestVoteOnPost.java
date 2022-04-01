package com.example.snowdropserver.integration.posts;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestVoteOnPost {
    @Test
    public void testUpvote() throws Exception {
        TestingUtils.createUserAndExpect("testUpvote3",
                "testUpvote3@test.com",
                "testUpvote3",
                201);
        int postId = TestingUtils.createPostAndExpect("testUpvote3",
                "testUpvote3",
                "testUpvote3",
                74,
                201);
        TestingUtils.voteAndExpect(postId,
                "testUpvote3",
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
        TestingUtils.createUserAndExpect("testUpvoteTwice2",
                "testUpvoteTwic2e@test.com",
                "testUpvoteTwice2",
                201);
        int postId = TestingUtils.createPostAndExpect("testUpvoteTwice2",
                "testUpvoteTwice2",
                "testUpvoteTwice2",
                3,
                201);
        TestingUtils.voteAndExpect(postId,
                "testUpvoteTwice2",
                1,
                200);
        TestingUtils.voteAndExpect(postId,
                "testUpvoteTwice2",
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
