package com.arabsoft.todo_app.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"userId", "firstname", "lastname", "username", "email", "role"})
public interface UserSummary {
    long getUserId();
    String getFirstname();
    String getLastname();
    String getUsername();
    String getEmail();
    String getRole();
}
