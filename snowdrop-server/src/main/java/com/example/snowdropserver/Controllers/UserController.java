package com.example.snowdropserver.Controllers;

import com.example.snowdropserver.Models.Domains.AddUserDomain;
import com.example.snowdropserver.Models.Domains.ChangeForgottenDomain;
import com.example.snowdropserver.Models.Domains.LoginDomain;
import com.example.snowdropserver.Models.Domains.UpdatePasswordDomain;
import com.example.snowdropserver.Models.User;
import com.example.snowdropserver.Services.UserService;
import liquibase.pro.packaged.P;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

    // @PostMapping maps the HTTP put requests on the endpoint to this method
    // it calls the service method and ultimately adds the user to the database
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AddUserDomain addUser(@RequestBody AddUserDomain user) {
        return userService.addUser(user);
    }

    @PostMapping(value = "/login")
    public String login(@RequestBody LoginDomain loginDomain) {
        return userService.login(loginDomain);
    }

    @PostMapping(value = "/{email}/forgot-password")
    public void forgotPassword(@PathVariable String email) {
        userService.forgotPassword(email);
    }

    @PostMapping(value = "/{email}/update-forgot-password")
    public void updateForgottenPassword(@PathVariable String email, @RequestBody ChangeForgottenDomain changeForgottenDomain) {
        userService.updateForgottenPassword(email, changeForgottenDomain);
    }

    @PostMapping(value = "/{email}/update-password")
    public void updatePassword(@PathVariable String email, @RequestBody UpdatePasswordDomain updatePasswordDomain) {
        userService.updatePassword(email, updatePasswordDomain);
    }
}
