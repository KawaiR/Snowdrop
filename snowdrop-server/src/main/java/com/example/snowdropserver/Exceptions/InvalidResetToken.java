package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidResetToken extends ResponseStatusException {
    public InvalidResetToken() {
        super(HttpStatus.BAD_REQUEST, "The pin you entered is incorrect. Please try again.");
    }
}
