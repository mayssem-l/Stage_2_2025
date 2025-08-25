package com.arabsoft.todo_app.dto;

import com.arabsoft.todo_app.dao.entities.Task;
import com.arabsoft.todo_app.dao.entities.TaskCategory;
import com.arabsoft.todo_app.dao.entities.TaskStatus;

import java.time.LocalDateTime;

public record TaskDTO(
        Long taskId,
        String title,
        String description,
        TaskStatus status,
        TaskCategory category,
        LocalDateTime dueDate,
        String username,
        Long userId
) {
    public static TaskDTO fromEntity(Task task) {
        return new TaskDTO(
                task.getTaskId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCategory(),
                task.getDueDate(),
                task.getUser() != null ? task.getUser().getUsername() : null,
                task.getUser() != null ? task.getUser().getUserId() : null
        );
    }
}
