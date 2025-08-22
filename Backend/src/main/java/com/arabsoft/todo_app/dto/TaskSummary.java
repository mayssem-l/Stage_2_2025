package com.arabsoft.todo_app.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.time.LocalDateTime;

@JsonPropertyOrder({"taskId", "title", "description", "status", "category", "dueDate"})
public interface TaskSummary {
    long getTaskId();
    String getTitle();
    String getDescription();
    String getStatus();
    String getCategory();
    LocalDateTime getDueDate();
}
