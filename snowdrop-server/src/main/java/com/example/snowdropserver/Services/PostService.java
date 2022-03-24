package com.example.snowdropserver.Services;

import com.example.snowdropserver.Exceptions.PlantNotFoundException;
import com.example.snowdropserver.Exceptions.PostNotFoundException;
import com.example.snowdropserver.Exceptions.TagNotFoundException;
import com.example.snowdropserver.Exceptions.UserNotFoundException;
import com.example.snowdropserver.Models.Domains.CreatePostDomain;
import com.example.snowdropserver.Models.Domains.PostInfoDomain;
import com.example.snowdropserver.Models.Plant;
import com.example.snowdropserver.Models.Post;
import com.example.snowdropserver.Models.Tag;
import com.example.snowdropserver.Models.User;
import com.example.snowdropserver.Repositories.PlantRepository;
import com.example.snowdropserver.Repositories.PostRepository;
import com.example.snowdropserver.Repositories.TagRepository;
import com.example.snowdropserver.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PlantRepository plantRepository;
    private final TagRepository tagRepository;

    @Autowired
    public PostService(PostRepository postRepository, UserRepository userRepository, PlantRepository plantRepository, TagRepository tagRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.plantRepository = plantRepository;
        this.tagRepository = tagRepository;
    }

    public List<Post> getAllPosts() {
        // this is the logic for the controller endpoint -- it's a simple service so there isn't much logic
        return postRepository.findAll();
    }

    public int createPost(CreatePostDomain createPostDomain) {
        Optional<User> maybeUser = userRepository.getByUserName(createPostDomain.getUsername());

        if (!maybeUser.isPresent()) {
            System.out.println("no user found with this username.");
            throw new UserNotFoundException();
        }
        User user = maybeUser.get();

        Optional<Plant> maybePlant = plantRepository.getById(createPostDomain.getPlantId());

        if (!maybePlant.isPresent()) {
            System.out.println("Plant not found.");
            throw new PlantNotFoundException();
        }
        Plant plant = maybePlant.get();

        Optional<Tag> maybeTag = tagRepository.getByPlant(plant);

        if (!maybeTag.isPresent()) {
            System.out.println("Tag wasn't found.");
            throw new TagNotFoundException();
        }
        Tag tag = maybeTag.get();

        Post post = Post.builder()
                .postTitle(createPostDomain.getPostTitle())
                .content(createPostDomain.getContent())
                .sender(user)
                .tag(tag)
                .totalScore(0)
                .upvotes(0)
                .downvotes(0)
                .uploadDate(LocalDateTime.now())
                .children(null)
                .build();

        System.out.println("created post");

        postRepository.save(post);

        System.out.println("post id: " + post.getId());
        return post.getId();
    }

    public PostInfoDomain getPostInfo(int postId) {
        Optional<Post> maybePost = postRepository.findById(postId);
        if (!maybePost.isPresent()) {
            System.out.println("Post not found.");
            throw new PostNotFoundException();
        }

        Post post = maybePost.get();
        PostInfoDomain postInfoDomain = PostInfoDomain.builder()
                .postTitle(post.getPostTitle())
                .totalScore(post.getTotalScore())
                .uploadDate(post.getUploadDate())
                .username(post.getSender().getUserName())
                .downvotes(post.getDownvotes())
                .upvotes(post.getUpvotes())
                .build();

        return postInfoDomain;
    }

    public List<Post> getPostsByTag(int tagId) {
        Optional<Tag> maybeTag = tagRepository.getById(tagId);
        if (!maybeTag.isPresent()) {
            System.out.println("Tag not found");
            throw new TagNotFoundException();
        }

        Tag tag = maybeTag.get();

        return postRepository.getByTag(tag);
    }

}
