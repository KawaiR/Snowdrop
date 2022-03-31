package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class DuplicatePlantException extends ResponseStatusException {
    public DuplicatePlantException() {
        super(HttpStatus.BAD_REQUEST, "This plant already exists in our database.");
    }
}
