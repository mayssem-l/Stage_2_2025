package com.arabsoft.todo_app.service.Implementation;

import com.arabsoft.todo_app.dao.entities.User;
import com.arabsoft.todo_app.dao.repository.UserRepository;
import com.arabsoft.todo_app.dto.UserSummary;
import com.arabsoft.todo_app.service.Interface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserSummary> getAllUsers() {
        return userRepository.findAllProjectedBy();
    }

    @Override
    public User getUserById(long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User saveUser(User user) {
        System.out.println("=== Saving user with ID: " + user.getUserId()+" ===");
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        User oldUser = getUserById(user.getUserId());
        if (oldUser == null) {
            throw new UsernameNotFoundException("User not found");
        }
        if (user.getFirstname() != null) {
            oldUser.setFirstname(user.getFirstname());
        }
        if (user.getLastname() != null) {
            oldUser.setLastname(user.getLastname());
        }
        if (user.getUsername() != null) {
            oldUser.setUsername(user.getUsername());
        }
        if (user.getEmail() != null) {
            oldUser.setEmail(user.getEmail());
        }
        if (user.getRole() != null) {
            oldUser.setRole(user.getRole());
        }

        return userRepository.save(oldUser);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, String> deleteUser(long userId) {
        Map<String, String> response = new HashMap<>();
        try {
            userRepository.deleteById(userId);
            response.put("message", "User has been deleted successfully");
            response.put("userId", String.valueOf(userId));
            return response;
        } catch (Exception e) {
            System.err.println(e.getMessage());
            response.put("error", "An error occurred while trying to delete the user");
            response.put("userId", String.valueOf(userId));
            return response;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User \"" + username + "\" not found");
        }

        String roleName = "ROLE_" + user.getRole().name();

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority(roleName))
        );
    }
}
