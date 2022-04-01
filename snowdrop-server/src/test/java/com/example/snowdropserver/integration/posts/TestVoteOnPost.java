package com.example.snowdropserver.integration.posts;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

// something
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
                3,
                201);
        TestingUtils.voteAndExpect(postId,
                "testDownvote3",
                0,
                200);
    }

    @Test
    public void testUpvoteThenDownvote() throws Exception {
        TestingUtils.createUserAndExpect("testUpvoteThenDownvote1",
                "testUpvoteThenDownvote1@test.com",
                "testUpvoteThenDownvote1",
                201);
        int postId = TestingUtils.createPostAndExpect("testUpvoteThenDownvote1",
                "testUpvoteThenDownvote1",
                "testUpvoteThenDownvote1",
                2,
                201);
        TestingUtils.voteAndExpect(postId,
                "testUpvoteThenDownvote1",
                1,
                200);
        TestingUtils.voteAndExpect(postId,
                "testUpvoteThenDownvote1",
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
                3,
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
                3,
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
                3,
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
