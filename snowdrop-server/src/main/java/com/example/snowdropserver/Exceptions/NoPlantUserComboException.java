package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NoPlantUserComboException extends ResponseStatusException {
    public NoPlantUserComboException() {
        super(HttpStatus.BAD_REQUEST, "The user doesn't have this plant added under their care.");
    }
}
