package com.example.snowdropserver.Controllers;

import com.example.snowdropserver.Models.Post;
import com.example.snowdropserver.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
// the server will look to map requests that start with "/posts" to the endpoints in this controller
@RequestMapping(value = "/posts", produces = "application/json; charset=utf-8")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    // @GetMapping maps HTTP GET requests on the endpoint to this method
    // Because no url value has been specified, this is mapping the class-wide "/posts" url
    @GetMapping
    public List<Post> getAllPosts() {
        // Have the logic in PostService
        // Ideally, PostController should just control the request mappings
        return postService.getAllPosts();
    }
}
