package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotSenderException extends ResponseStatusException {
    public NotSenderException() {
        super(HttpStatus.BAD_REQUEST, "This post was not created by this user.");
    }
}
