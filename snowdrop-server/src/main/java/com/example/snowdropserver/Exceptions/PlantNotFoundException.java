package com.example.snowdropserver.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PlantNotFoundException extends ResponseStatusException {
    public PlantNotFoundException() {
        super(HttpStatus.BAD_REQUEST, "The plant you're looking for wasn't found in the database");
    }
}
