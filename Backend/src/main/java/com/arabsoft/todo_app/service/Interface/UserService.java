package com.arabsoft.todo_app.service.Interface;

import com.arabsoft.todo_app.dao.entities.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<User> getAllUsers();
    Map<String, String>  deleteUser(long userId);
    User getUserById(long userId);
    User saveUser(User user);

}
