package com.example.snowdropserver.integration.posts;

import com.example.snowdropserver.Models.Post;
import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

import java.util.List;

public class TestGetPostsByTag {

    @Test
    public void zeroPosts() throws Exception {
        TestingUtils.createUserAndExpect("zeroPosts",
                "zeroPosts@test.com",
                "zeroPosts",
                201);

        List<Post> posts = TestingUtils.getPostsByTagAndExpect(1, 200);
        assert(posts.size() == 0);
    }

    @Test
    public void onePost() throws Exception {
        TestingUtils.createUserAndExpect("onePost111",
                "onePost111@test.com",
                "onePost11",
                201);
        int postId = TestingUtils.createPostAndExpect("onePost11",
                "onePost11",
                "onePost11",
                5,
                201);
        List<Post> posts = TestingUtils.getPostsByTagAndExpect(3, 200);
        assert(posts.size() >= 1);
    }

    @Test
    public void twoPosts() throws Exception {
        TestingUtils.createUserAndExpect("twoPosts2222",
                "twoPosts2222@test.com",
                "twoPosts22",
                201);
        int postId = TestingUtils.createPostAndExpect("twoPosts22",
                "twoPosts22",
                "twoPosts22",
                4,
                201);
        int postId2 = TestingUtils.createPostAndExpect("twoPosts22",
                "twoPosts22",
                "twoPosts22",
                4,
                201);
        List<Post> posts = TestingUtils.getPostsByTagAndExpect(5, 200);
        System.out.println(posts);
        assert(posts.size() >= 2);
    }
}
