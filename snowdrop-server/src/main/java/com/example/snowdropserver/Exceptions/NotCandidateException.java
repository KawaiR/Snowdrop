package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotCandidateException extends ResponseStatusException {
    public NotCandidateException() {
        super(HttpStatus.BAD_REQUEST, "This user isn't a candidate for editing.");
    }
}
