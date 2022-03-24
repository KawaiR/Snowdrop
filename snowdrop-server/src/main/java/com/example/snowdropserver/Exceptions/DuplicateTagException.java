package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class DuplicateTagException extends ResponseStatusException {
    public DuplicateTagException() {
        super(HttpStatus.BAD_REQUEST, "A tag for this plant already exists.");
    }
}
