package com.example.snowdropserver.Controllers;

import com.example.snowdropserver.Models.Comment;
import com.example.snowdropserver.Services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
// the server will look to map requests that start with "/comments" to the endpoints in this controller
@RequestMapping(value = "/comments", produces = "application/json; charset=utf-8")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // @GetMapping maps HTTP GET requests on the endpoint to this method
    // Because no url value has been specified, this is mapping the class-wide "/comments" url
    @GetMapping
    public List<Comment> getAllComments() {
        // Have the logic in CommentService
        // Ideally, CommentController should just control the request mappings
        return commentService.getAllComments();
    }
}
