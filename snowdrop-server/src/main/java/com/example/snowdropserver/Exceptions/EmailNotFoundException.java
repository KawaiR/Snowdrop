package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class EmailNotFoundException extends ResponseStatusException {
    public EmailNotFoundException() {
        super(HttpStatus.BAD_REQUEST, "There's no user registered with the email you entered.");
    }
}
