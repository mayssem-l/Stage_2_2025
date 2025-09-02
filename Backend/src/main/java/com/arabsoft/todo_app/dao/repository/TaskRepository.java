package com.arabsoft.todo_app.dao.repository;

import com.arabsoft.todo_app.dao.entities.Task;
import com.arabsoft.todo_app.dao.entities.TaskCategory;
import com.arabsoft.todo_app.dao.entities.TaskStatus;
import com.arabsoft.todo_app.dto.TaskSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByUserUserId(long userId);

    @Query(value = "SELECT DISTINCT category FROM task", nativeQuery = true)
    List<Integer> getCategories();
}
