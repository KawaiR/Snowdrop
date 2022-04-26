package com.example.snowdropserver.Services;

import com.example.snowdropserver.Exceptions.CommentNotFoundException;
import com.example.snowdropserver.Exceptions.PostNotFoundException;
import com.example.snowdropserver.Exceptions.UserNotFoundException;
import com.example.snowdropserver.Models.Comment;
import com.example.snowdropserver.Models.Domains.CreateCommentDomain;
import com.example.snowdropserver.Models.Post;
import com.example.snowdropserver.Models.User;
import com.example.snowdropserver.Repositories.CommentRepository;
import com.example.snowdropserver.Repositories.PostRepository;
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

    @Autowired
    public CommentService(CommentRepository commentRepository, UserRepository userRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
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

        List<Comment> comments = commentRepository.getByPost(post);

        return comments;
    }
}
