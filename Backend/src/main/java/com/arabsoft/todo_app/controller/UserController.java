package com.arabsoft.todo_app.controller;

import com.arabsoft.todo_app.dao.entities.User;
import com.arabsoft.todo_app.dto.UserSummary;
import com.arabsoft.todo_app.service.Interface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getAll")
    public List<UserSummary> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("getUserById")
    public User getUserById(@RequestParam("id") int id) {
        return userService.getUserById(id);
    }

    @PostMapping("/update")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @PostMapping("/saveUser")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @DeleteMapping("/deleteUser")
    public Map<String, String> deleteUser(@RequestParam("id") int id) {
        return userService.deleteUser(id);
    }

}
