package com.arabsoft.todo_app.service.Implementation;

import com.arabsoft.todo_app.dao.entities.Task;
import com.arabsoft.todo_app.dao.entities.User;
import com.arabsoft.todo_app.dao.entities.TaskCategory;
import com.arabsoft.todo_app.dao.repository.TaskRepository;
import com.arabsoft.todo_app.service.Interface.TaskService;
import com.arabsoft.todo_app.service.Interface.UserService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserService userService;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, UserService userService) {
        this.userService = userService;
        this.taskRepository = taskRepository;
    }

    @Override
    public Task getTaskById(long taskId) {
        return taskRepository.findById(taskId).orElse(null);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public List<String> getCategories() {
        List<Integer> categoriesIds = taskRepository.getCategories();
        return categoriesIds.stream()
                .map(i -> TaskCategory.values()[i].name())
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, String> deleteTask(long taskId) {
        Map<String, String> response = new HashMap<>();
        try {
            taskRepository.deleteById(taskId);
            response.put("message", "Task has been deleted successfully");
            response.put("taskId", String.valueOf(taskId));
            return response;
        } catch (Exception e) {
            System.err.println(e.getMessage());
            response.put("error", "An error occurred while deleting the task.");
            response.put("taskId", String.valueOf(taskId));
            return response;
        }
    }

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public Task assignTaskToUser(Long userId, @NotNull Task task) {
        User user = userService.getUserById(userId);
        if (user == null) {
            throw new RuntimeException("User with userId: "+userId+" was not found");
        }

        task.setUser(user);
        return taskRepository.save(task);
    }

    public void removeTaskFromUser(Long userId, Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (task.getUser() == null || task.getUser().getUserId() != userId) {
            throw new RuntimeException("Task does not belong to the specified user");
        }

        taskRepository.delete(task);
        task.setUser(null);
    }

}
