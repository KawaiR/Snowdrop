package com.example.snowdropserver.Services;

import com.example.snowdropserver.Exceptions.CommentNotFoundException;
import com.example.snowdropserver.Exceptions.PostNotFoundException;
import com.example.snowdropserver.Exceptions.UserNotFoundException;
import com.example.snowdropserver.Models.*;
import com.example.snowdropserver.Models.Domains.CreateCommentDomain;
import com.example.snowdropserver.Models.Domains.VoteOnPostDomain;
import com.example.snowdropserver.Models.Domains.VoteResultDomain;
import com.example.snowdropserver.Repositories.CommentRepository;
import com.example.snowdropserver.Repositories.PostRepository;
import com.example.snowdropserver.Repositories.UserCommentMappingsRepository;
import com.example.snowdropserver.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final UserCommentMappingsRepository userCommentRepository;
    private final UserService userService;

    @Autowired
    public CommentService(CommentRepository commentRepository, UserRepository userRepository, PostRepository postRepository, UserCommentMappingsRepository userCommentRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.userCommentRepository = userCommentRepository;
        this.userService = userService;
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public int createComment(int postId, CreateCommentDomain createCommentDomain) {
        Optional<User> maybeUser = userRepository.getByUserName(createCommentDomain.getUsername());
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

        Comment comment = Comment.builder()
                .content(createCommentDomain.getContent())
                .downvotes(0)
                .upvotes(0)
                .totalScore(0)
                .uploadDate(LocalDateTime.now())
                .sender(user)
                .parent(post)
                .build();

        commentRepository.save(comment);

        return comment.getId();
    }

    public int deleteComment(int commentId) {
        Optional<Comment> maybeComment = commentRepository.findById(commentId);
        if (!maybeComment.isPresent()) {
            System.out.println("no comment was found with this id");
            throw new CommentNotFoundException();
        }

        Comment comment = maybeComment.get();
        commentRepository.delete(comment);

        return commentId;
    }

    public List<Comment> getByPost(int postId) {
        Optional<Post> maybePost = postRepository.findById(postId);

        if (!maybePost.isPresent()) {
            System.out.println("Post doesn't exist");
            throw new PostNotFoundException();
        }
        Post post = maybePost.get();

        List<Comment> comments = commentRepository.findByParent(post);

        return comments;
    }

    public VoteResultDomain voteOnComment(int commentId, VoteOnPostDomain voteOnPostDomain) {
        // verify user
        Optional<User> maybeUser = userRepository.getByUserName(voteOnPostDomain.getUsername());
        if (!maybeUser.isPresent()) {
            System.out.println("no user found with this username.");
            throw new UserNotFoundException();
        }
        User user = maybeUser.get();

        // verify comment
        Optional<Comment> maybeComment = commentRepository.findById(commentId);
        if (!maybeComment.isPresent()) {
            System.out.println("no post was found with this id");
            throw new CommentNotFoundException();
        }
        Comment comment = maybeComment.get();
        User commentSender = comment.getSender();

        int userVote = user_comment_mapping(comment.getId(), user.getUserName());

        int newScore;
        int numUpvotes;
        int numDownvotes;

        if (voteOnPostDomain.getUpvote() == 1) {
            if (userVote == 1) { //upvoted previously
                numUpvotes = comment.getUpvotes() - 1;
                numDownvotes = comment.getDownvotes();
                userCommentRepository.delete(userCommentRepository.findByCommentAndUser(comment, user).get()); // remove mapping
//               postSender.setTotalPoints(postSender.getTotalPoints() - 1);
            } else if (userVote == 0) { // downvoted previously
                numUpvotes = comment.getUpvotes() + 1;
                numDownvotes = comment.getDownvotes() - 1;
//               postSender.setTotalPoints(postSender.getTotalPoints() + 2);
            } else {
                numUpvotes = comment.getUpvotes() + 1;
                numDownvotes = comment.getDownvotes();
//               postSender.setTotalPoints(postSender.getTotalPoints() + 1);
            }
        } else {
            if (userVote == 1) { //upvoted previously
                numUpvotes = comment.getUpvotes() - 1;
                numDownvotes = comment.getDownvotes() + 1;
//               postSender.setTotalPoints(postSender.getTotalPoints() - 2);
            } else if (userVote == 0) { // downvoted previously
                numUpvotes = comment.getUpvotes();
                numDownvotes = comment.getDownvotes() - 1;
                userCommentRepository.delete(userCommentRepository.findByCommentAndUser(comment, user).get()); // remove mapping
//               postSender.setTotalPoints(postSender.getTotalPoints() + 1);
            } else {
                numUpvotes = comment.getUpvotes();
                numDownvotes = comment.getDownvotes() + 1;
//               postSender.setTotalPoints(postSender.getTotalPoints() - 1);
            }
        }

        newScore = numUpvotes - numDownvotes;
        comment.setDownvotes(numDownvotes);
        comment.setUpvotes(numUpvotes);

        // update post sender score and expertise level accordingly
        commentSender.setTotalPoints(commentSender.getTotalPoints() - comment.getTotalScore() + newScore);
        userService.level_up(commentSender);

        userRepository.save(commentSender);
        // update total score to be displayed
        comment.setTotalScore(newScore);

        if (userVote == -1) { // user is voting for the first time
            UserCommentMappings userCommentMappings = UserCommentMappings.builder()
                    .comment(comment)
                    .user(user)
                    .upvote(voteOnPostDomain.getUpvote())
                    .build();

            userCommentRepository.save(userCommentMappings);
        }

        commentRepository.save(comment);

        VoteResultDomain voteResultDomain = VoteResultDomain.builder()
                .newScore(newScore)
                .downvotes(comment.getDownvotes())
                .upvotes(comment.getUpvotes())
                .build();

        return voteResultDomain;
    }

    public int user_comment_mapping(int commentId, String username) {
        // verify comment
        Optional<Comment> maybeComment = commentRepository.findById(commentId);
        if (!maybeComment.isPresent()) {
            System.out.println("no post was found with this id");
            throw new CommentNotFoundException();
        }
        Comment comment = maybeComment.get();

        Optional<User> maybeUser = userRepository.getByUserName(username);
        if (!maybeUser.isPresent()) {
            System.out.println("no user found with this username.");
            throw new UserNotFoundException();
        }
        User user = maybeUser.get();

        Optional<UserCommentMappings> maybeMapping = userCommentRepository.findByCommentAndUser(comment, user);
        int vote = -1;
        if (maybeMapping.isPresent()) {
            UserCommentMappings mappingVal = maybeMapping.get();
            vote = mappingVal.getUpvote();
        }

        return vote;
    }
}
