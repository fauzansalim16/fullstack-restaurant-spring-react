package com.rpl.server.controller;

import com.rpl.server.entity.User;
import com.rpl.server.model.RegisterUserRequest;
import com.rpl.server.model.UpdateUserRequest;
import com.rpl.server.model.WebResponse;
import com.rpl.server.model.UserResponse;
import com.rpl.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(
            path = "/registrasi",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public WebResponse<String> register(@RequestBody RegisterUserRequest request) {
        userService.register(request);
        return WebResponse.<String>builder().data("OK").build();
    }
    @GetMapping(
            path = "/users/current",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public WebResponse<UserResponse> get(User user) {
        UserResponse userResponse = userService.get(user);
        return WebResponse.<UserResponse>builder().data(userResponse).build();
    }
    @PatchMapping(
            path = "/users/current",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public WebResponse<UserResponse> update( User user, @RequestBody UpdateUserRequest request){
        UserResponse userResponse = userService.update(user,request);
        return WebResponse.<UserResponse>builder().data(userResponse).build();
    }
}
