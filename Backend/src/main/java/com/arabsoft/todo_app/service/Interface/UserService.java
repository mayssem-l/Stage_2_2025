package com.arabsoft.todo_app.service.Interface;

import com.arabsoft.todo_app.dao.entities.User;
import com.arabsoft.todo_app.dto.UserSummary;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<UserSummary> getAllUsers();
    User getUserById(long userId);
    User getUserByUsername(String username);
    User saveUser(User user);
    User updateUser(User user);
    Map<String, String>  deleteUser(long userId);
}
