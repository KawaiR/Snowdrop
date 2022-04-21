package com.example.snowdropserver.Services;

import com.example.snowdropserver.Exceptions.PlantNotFoundException;
import com.example.snowdropserver.Exceptions.PostNotFoundException;
import com.example.snowdropserver.Exceptions.TagNotFoundException;
import com.example.snowdropserver.Exceptions.UserNotFoundException;
import com.example.snowdropserver.Models.*;
import com.example.snowdropserver.Models.Domains.*;
import com.example.snowdropserver.Repositories.*;
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
    private final UserService userService;

    @Autowired
    public PostService(PostRepository postRepository, UserRepository userRepository, PlantRepository plantRepository, TagRepository tagRepository, UserPostMappingsRepository userPostRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.plantRepository = plantRepository;
        this.tagRepository = tagRepository;
        this.userPostRepository = userPostRepository;
        this.userService = userService;
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

    public VoteResultDomain voteOnPost(int postId, VoteOnPostDomain voteOnPostDomain) {
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
        User postSender = post.getSender();

        int userVote = user_post_mapping(post.getId(), user.getUserName());

       int newScore;
       int numUpvotes;
       int numDownvotes;

       if (voteOnPostDomain.getUpvote() == 1) {
           if (userVote == 1) { //upvoted previously
               numUpvotes = post.getUpvotes() - 1;
               numDownvotes = post.getDownvotes();
               userPostRepository.delete(userPostRepository.findByPostAndUser(post, user).get()); // remove mapping
//               postSender.setTotalPoints(postSender.getTotalPoints() - 1);
           } else if (userVote == 0) { // downvoted previously
               numUpvotes = post.getUpvotes() + 1;
               numDownvotes = post.getDownvotes() - 1;
//               postSender.setTotalPoints(postSender.getTotalPoints() + 2);
           } else {
               numUpvotes = post.getUpvotes() + 1;
               numDownvotes = post.getDownvotes();
//               postSender.setTotalPoints(postSender.getTotalPoints() + 1);
           }
       } else {
           if (userVote == 1) { //upvoted previously
               numUpvotes = post.getUpvotes() - 1;
               numDownvotes = post.getDownvotes() + 1;
//               postSender.setTotalPoints(postSender.getTotalPoints() - 2);
           } else if (userVote == 0) { // downvoted previously
               numUpvotes = post.getUpvotes();
               numDownvotes = post.getDownvotes() - 1;
               userPostRepository.delete(userPostRepository.findByPostAndUser(post, user).get()); // remove mapping
//               postSender.setTotalPoints(postSender.getTotalPoints() + 1);
           } else {
               numUpvotes = post.getUpvotes();
               numDownvotes = post.getDownvotes() + 1;
//               postSender.setTotalPoints(postSender.getTotalPoints() - 1);
           }
       }



       newScore = numUpvotes - numDownvotes;
       post.setDownvotes(numDownvotes);
       post.setUpvotes(numUpvotes);

       // update post sender score and expertise level accordingly
       postSender.setTotalPoints(postSender.getTotalPoints() - post.getTotalScore() + newScore);
       userService.level_up(postSender);

       userRepository.save(postSender);
       // update total score to be displayed
       post.setTotalScore(newScore);

       if (userVote == -1) { // user is voting for the first time
           UserPostMappings userPostMappings = UserPostMappings.builder()
                   .post(post)
                   .user(user)
                   .upvote(voteOnPostDomain.getUpvote())
                   .build();

           userPostRepository.save(userPostMappings);
       }

        postRepository.save(post);

        VoteResultDomain voteResultDomain = VoteResultDomain.builder()
                .newScore(newScore)
                .downvotes(post.getDownvotes())
                .upvotes(post.getUpvotes())
                .build();

        return voteResultDomain;
    }

    public int user_post_mapping(int postId, String username) {
        // verify post
        Optional<Post> maybePost = postRepository.findById(postId);
        if (!maybePost.isPresent()) {
            System.out.println("no post was found with this id");
            throw new PostNotFoundException();
        }
        Post post = maybePost.get();

        Optional<User> maybeUser = userRepository.getByUserName(username);
        if (!maybeUser.isPresent()) {
            System.out.println("no user found with this username.");
            throw new UserNotFoundException();
        }
        User user = maybeUser.get();

        Optional<UserPostMappings> maybeMapping = userPostRepository.findByPostAndUser(post, user);
        int vote = -1;
        if (maybeMapping.isPresent()) {
            UserPostMappings mappingVal = maybeMapping.get();
            vote = mappingVal.getUpvote();
        }

        return vote;
    }

}
