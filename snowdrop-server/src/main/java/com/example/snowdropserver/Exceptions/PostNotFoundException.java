package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PostNotFoundException extends ResponseStatusException {
    public PostNotFoundException() {
        super(HttpStatus.BAD_REQUEST, "Couldn't find the post you're looking for.");
    }
}
