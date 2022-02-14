package com.example.snowdropserver.Controllers;

import com.example.snowdropserver.Models.User;
import com.example.snowdropserver.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
// the server will look to map requests that start with "/users" to the endpoints in this controller
@RequestMapping(value = "/users", produces = "application/json; charset=utf-8")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // @GetMapping maps HTTP GET requests on the endpoint to this method
    // Because no url value has been specified, this is mapping the class-wide "/users" url
    @GetMapping
    public List<User> getAllUsers() {
        // Have the logic in UserService
        // Ideally, UserController should just control the request mappings
        return userService.getAllUsers();
    }
}
