package com.arabsoft.todo_app.dao.repository;

import com.arabsoft.todo_app.dao.entities.User;
import com.arabsoft.todo_app.dto.UserSummary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {
    List<UserSummary> findAllProjectedBy();
    User findByUsername(String username);
}
