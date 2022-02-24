package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidAuthTokenException extends ResponseStatusException {
    public InvalidAuthTokenException() {
        super(HttpStatus.BAD_REQUEST, "The authentication token passed is invalid");
    }
}
