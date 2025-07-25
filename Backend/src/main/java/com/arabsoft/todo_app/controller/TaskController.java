package com.arabsoft.todo_app.controller;

import com.arabsoft.todo_app.dao.entities.Task;
import com.arabsoft.todo_app.service.Interface.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/getAll")
    public List<Task> getAllTasks(@AuthenticationPrincipal UserDetails user) {
        System.out.println(user.getUsername());
        return taskService.getAllTasks();
    }

    @GetMapping("/getCategories")
    public List<String> getCategories() {
        return taskService.getCategories();
    }

    @GetMapping("/getTaskById")
    public Task getTaskById(@RequestParam("id") int id) {
        return taskService.getTaskById(id);
    }

    @PostMapping("/saveTask")
    public Task saveTask(@RequestBody Task task) {
        return taskService.saveTask(task);
    }

    @DeleteMapping("/deleteTask")
    public Map<String,String> deleteTask(@RequestParam("id") int id) {
        return taskService.deleteTask(id);
    }

}
