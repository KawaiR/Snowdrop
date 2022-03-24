package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class TagNotFoundException extends ResponseStatusException {
    public TagNotFoundException() {
        super(HttpStatus.BAD_REQUEST, "There's no tag for this plant.");
    }
}
