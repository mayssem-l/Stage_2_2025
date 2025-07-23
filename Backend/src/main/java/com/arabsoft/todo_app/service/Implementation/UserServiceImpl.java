package com.arabsoft.todo_app.service.Implementation;

import com.arabsoft.todo_app.dao.entities.User;
import com.arabsoft.todo_app.dao.repository.UserRepository;
import com.arabsoft.todo_app.service.Interface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Map<String, String> deleteUser(long userId) {
        Map<String, String> response = new HashMap<>();
        try {
            userRepository.deleteById(userId);
            response.put("message", "User has been deleted successfully");
            response.put("userId", String.valueOf(userId));
            return response;
        }
        catch (Exception e) {
            System.err.println(e.getMessage());
            response.put("error", "An error occurred while trying to delete the user");
            response.put("userId", String.valueOf(userId));
            return response;
        }
    }

    @Override
    public User getUserById(long userId) {
        return userRepository.findById(userId).orElse(null);
    }
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
                if (user == null) {
                    throw new UsernameNotFoundException("User \""+username+"\" not found");
                }

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(), // must be already encoded
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
