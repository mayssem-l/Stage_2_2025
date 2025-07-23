package com.arabsoft.todo_app.service.Implementation;

import com.arabsoft.todo_app.dao.entities.Task;
import com.arabsoft.todo_app.dao.entities.TaskCategory;
import com.arabsoft.todo_app.dao.entities.TaskStatus;
import com.arabsoft.todo_app.dao.repository.TaskRepository;
import com.arabsoft.todo_app.service.Interface.TaskService;
import com.arabsoft.todo_app.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
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
        List<String> categories = categoriesIds.stream()
                .map(i -> TaskCategory.values()[i].name())
                .collect(Collectors.toList());
        return categories;
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

    //    public Task getTaskById(long id) {
//        return taskRepository.findByTaskId(id);
//    }
//    public Task getTaskByStatus(TaskStatus status) {
//        return taskRepository.findByStatus(status);
//    }
//    public Task getTaskByCategory(TaskCategory category) {
//        return taskRepository.findByCategory(category);
//    }
    //create and update
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }


}
