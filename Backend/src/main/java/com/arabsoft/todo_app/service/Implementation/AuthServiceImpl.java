package com.arabsoft.todo_app.service.Implementation;

import com.arabsoft.todo_app.dao.entities.User;
import com.arabsoft.todo_app.service.Interface.AuthService;
import com.arabsoft.todo_app.util.jwt.JWTService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authManager;
    private final JWTService jwtService;
    private final UserServiceImpl userService;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(AuthenticationManager authManager, JWTService jwtService, UserServiceImpl userService, PasswordEncoder passwordEncoder) {
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String login(String username, String password) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        UserDetails user = userService.loadUserByUsername(username);
        return jwtService.generateToken(user.getUsername());
    }

    @Override
    public void register(User user) throws Exception {
        if (userService.getUserByUsername(user.getUsername()) != null) {
            throw new Exception("Username already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveUser(user);

    }

}
