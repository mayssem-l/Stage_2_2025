package com.arabsoft.todo_app.service;

import org.springframework.stereotype.Service;

@Service
public class MainService {

    public String sayHello() {
        return "Hello, Spring Boot From Service!";
    }
}
