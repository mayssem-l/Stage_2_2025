package com.arabsoft.todo_app.service.Interface;

import com.arabsoft.todo_app.dao.entities.User;

public interface AuthService {
    String login(String username, String password);
    void register(User user) throws Exception;
}
