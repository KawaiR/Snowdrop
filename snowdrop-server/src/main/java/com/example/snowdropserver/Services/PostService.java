package com.example.snowdropserver.Services;

import com.example.snowdropserver.Models.Post;
import com.example.snowdropserver.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts() {
        // this is the logic for the controller endpoint -- it's a simple service so there isn't much logic
        return postRepository.findAll();
    }
}
