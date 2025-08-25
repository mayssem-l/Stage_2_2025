package com.arabsoft.todo_app.service.Interface;

import com.arabsoft.todo_app.dao.entities.Task;
import com.arabsoft.todo_app.dto.TaskDTO;
import com.arabsoft.todo_app.dto.TaskRequest;
import com.arabsoft.todo_app.dto.TaskSummary;
//import com.arabsoft.todo_app.dao.entities.TaskCategory;
//import com.arabsoft.todo_app.dao.entities.TaskStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface TaskService {
    List<TaskDTO> getAllTasks();
    List<String> getCategories();
    Task getTaskById(long taskId);
    Task saveTask(Task task);
    Task saveTask(TaskRequest task);
    Map<String, String> deleteTask(long taskId);
}
