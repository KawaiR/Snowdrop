package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PasswordTooShortException extends ResponseStatusException {
    public PasswordTooShortException() {
        super(HttpStatus.BAD_REQUEST, "The password you entered is shorter than 8 characters.");
    }
}
