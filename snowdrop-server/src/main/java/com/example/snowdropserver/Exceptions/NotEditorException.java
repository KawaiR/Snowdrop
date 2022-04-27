package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotEditorException extends ResponseStatusException {
    public NotEditorException() {
        super(HttpStatus.BAD_REQUEST, "This user does not have the necessary privileges.");
    }
}
