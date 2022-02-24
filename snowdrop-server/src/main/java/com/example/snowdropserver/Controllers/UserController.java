package com.example.snowdropserver.Controllers;

import com.example.snowdropserver.Models.Domains.*;
import com.example.snowdropserver.Models.User;
import com.example.snowdropserver.Services.UserService;
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

    @PostMapping(value = "/update-forgot-password")
    public void updateForgottenPassword(@RequestBody ChangeForgottenDomain changeForgottenDomain) {
        userService.updateForgottenPassword(changeForgottenDomain);
    }

    @PostMapping(value = "/validate-reset-token")
    public void validate_reset_token(@RequestBody ValidateResetTokenDomain resetTokenDomain) {
        userService.validate_reset_token(resetTokenDomain);
    }

    @PostMapping(value = "/validate-password")
    public void validate_password(@RequestBody ValidatePasswordDomain validatePasswordDomain) {
        userService.validate_password(validatePasswordDomain);
    }

    @PostMapping(value = "/update-password")
    public void updatePassword(@RequestBody UpdatePasswordDomain updatePasswordDomain) {
        userService.updatePassword(updatePasswordDomain);
    }

    @PostMapping(value = "/change-email-request")
    public void changeEmail(@RequestBody String email) {
        userService.changeEmail(email);
    }

    @PostMapping(value = "/update-email")
    public void updateEmail(@RequestBody UpdateEmailDomain updateEmailDomain) {
        userService.updateEmail(updateEmailDomain);
    }
}
