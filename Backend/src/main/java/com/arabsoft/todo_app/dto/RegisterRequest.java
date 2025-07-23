package com.arabsoft.todo_app.dto;

public record RegisterRequest(
        String firstname,
        String lastname,
        String username,
        String email,
        String password
) {}
