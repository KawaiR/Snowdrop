package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class CommentNotFoundException extends ResponseStatusException {

    public CommentNotFoundException() {
        super(HttpStatus.BAD_REQUEST, "Couldn't find the comment you're looking for.");
    }
}
