package com.arabsoft.todo_app.dto;

import com.arabsoft.todo_app.dao.entities.TaskCategory;
import com.arabsoft.todo_app.dao.entities.TaskStatus;

import java.time.LocalDateTime;

public record TaskRequest(
        Long taskId,
        String title,
        String description,
        TaskStatus status,
        TaskCategory category,
        LocalDateTime dueDate,
        Long userId
) {}
