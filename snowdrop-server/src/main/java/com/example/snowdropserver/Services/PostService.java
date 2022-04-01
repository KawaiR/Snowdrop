package com.example.snowdropserver.Services;

import com.example.snowdropserver.Exceptions.PlantNotFoundException;
import com.example.snowdropserver.Exceptions.PostNotFoundException;
import com.example.snowdropserver.Exceptions.TagNotFoundException;
import com.example.snowdropserver.Exceptions.UserNotFoundException;
import com.example.snowdropserver.Models.*;
import com.example.snowdropserver.Models.Domains.CreatePostDomain;
import com.example.snowdropserver.Models.Domains.PostInfoDomain;
import com.example.snowdropserver.Models.Domains.VoteOnPostDomain;
import com.example.snowdropserver.Repositories.*;
import liquibase.pro.packaged.P;
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
    private final UserPostMappingsRepository userPostRepository;

    @Autowired
    public PostService(PostRepository postRepository, UserRepository userRepository, PlantRepository plantRepository, TagRepository tagRepository, UserPostMappingsRepository userPostRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.plantRepository = plantRepository;
        this.tagRepository = tagRepository;
        this.userPostRepository = userPostRepository;
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
                .content(post.getContent())
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

    // TODO: debug double upvote/downvote case
    public int voteOnPost(int postId, VoteOnPostDomain voteOnPostDomain) {
        // verify user
        Optional<User> maybeUser = userRepository.getByUserName(voteOnPostDomain.getUsername());
        if (!maybeUser.isPresent()) {
            System.out.println("no user found with this username.");
            throw new UserNotFoundException();
        }
        User user = maybeUser.get();

        // verify post
        Optional<Post> maybePost = postRepository.findById(postId);
        if (!maybePost.isPresent()) {
            System.out.println("no post was found with this id");
            throw new PostNotFoundException();
        }
        Post post = maybePost.get();

        // confirm user hasn't interacted with this post yet
        int adjustment = 0;
        Optional<UserPostMappings> votedByUser = userPostRepository.findByPostAndUser(post, user);
        if (votedByUser.isPresent()) {
            UserPostMappings mapping = votedByUser.get();
            if (mapping.getUpvote() == 1) {
                adjustment = 1;
            } else {
                adjustment = 2;
            }
        } else {
            UserPostMappings userPostMappings = UserPostMappings.builder()
                    .post(post)
                    .user(user)
                    .upvote(voteOnPostDomain.getUpvote())
                    .build();

            userPostRepository.save(userPostMappings);
        }

        System.out.println("adjustment: " + adjustment);

        int newScore;
        int numVotes;
        if (voteOnPostDomain.getUpvote() == 1) {
            numVotes = post.getUpvotes();
            if (adjustment != 1) {
                newScore = post.getTotalScore() + 1;
                numVotes++;
                if (adjustment == 2) {
                    post.setDownvotes(post.getDownvotes() - 1);
                }
            } else {
                newScore = post.getTotalScore() - 1;
            }
            post.setUpvotes(numVotes);
        } else {
            numVotes = post.getDownvotes();
            if (adjustment != 2) {
                newScore = post.getTotalScore() - 1;
                numVotes++;
                if (adjustment == 1) {
                    post.setUpvotes(post.getUpvotes() - 1);
                }
            } else {
                newScore = post.getTotalScore() + 1;
            }
            post.setDownvotes(numVotes);
        }
        post.setTotalScore(newScore);

        postRepository.save(post);

        return newScore;
    }

}
