package com.arabsoft.todo_app.service.Implementation;

import com.arabsoft.todo_app.dao.entities.Task;
import com.arabsoft.todo_app.dao.entities.TaskStatus;
import com.arabsoft.todo_app.dao.entities.User;
import com.arabsoft.todo_app.dao.entities.TaskCategory;
import com.arabsoft.todo_app.dao.repository.TaskRepository;
import com.arabsoft.todo_app.dto.TaskDTO;
import com.arabsoft.todo_app.dto.TaskRequest;
import com.arabsoft.todo_app.service.Interface.TaskService;
import com.arabsoft.todo_app.service.Interface.UserService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    public List<TaskDTO> getAllTasks() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        List<String> roles = auth.getAuthorities().stream().map(role -> role.toString().replace("ROLE_", "")).toList();

        if (roles.contains("ADMIN")) {
            return taskRepository
                    .findAll()
                    .stream()
                    .map(TaskDTO::fromEntity)
                    .toList();
        } else {
            User user = userService.getUserByUsername(auth.getName());
            long userId = user.getUserId();

            return taskRepository
                    .findAllByUserUserId(userId)
                    .stream()
                    .map(TaskDTO::fromEntity)
                    .toList();
        }


    }

    @Override
    public List<TaskCategory> getCategories() {
        return Arrays.asList(TaskCategory.values());
    }
    @Override
    public List<TaskStatus> getStatus(){ return Arrays.asList(TaskStatus.values()); }

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

    public Task saveTask(TaskRequest request) {
        System.out.println("Entering saveTask for TaskRequest");
        User user = userService.getUserById(request.userId());
        Task task = new Task();
        if (request.taskId() != null) {
            task.setTaskId(request.taskId());
        }
        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setStatus(request.status());
        task.setCategory(request.category());
        task.setDueDate(request.dueDate());
        task.setUser(user);
        return taskRepository.save(task);
    }

    public Task assignTaskToUser(Long userId, @NotNull Task task) {
        User user = userService.getUserById(userId);
        if (user == null) {
            throw new RuntimeException("User with userId: " + userId + " was not found");
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
