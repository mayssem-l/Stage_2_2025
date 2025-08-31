package com.arabsoft.todo_app.controller;

import com.arabsoft.todo_app.dao.entities.User;
import com.arabsoft.todo_app.dto.AuthRequest;
import com.arabsoft.todo_app.dto.AuthResponse;
import com.arabsoft.todo_app.dto.RegisterRequest;
import com.arabsoft.todo_app.service.Implementation.UserServiceImpl;
import com.arabsoft.todo_app.service.Interface.AuthService;
import com.arabsoft.todo_app.service.Interface.TaskService;
import com.arabsoft.todo_app.service.Interface.UserService;
import com.arabsoft.todo_app.util.jwt.JWTService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @Autowired
    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        String username = request.username();
        String password = request.password();

        String token = this.authService.login(username, password);
        User user = userService.getUserByUsername(username);

        return ResponseEntity.ok(new AuthResponse(token, user.getUserId()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        try {
            this.authService.register(user);
            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.ok(Map.of("error", "User could not be registered"));
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(Authentication authentication) {
        try {
            Collection<? extends GrantedAuthority> roles = authentication.getAuthorities();
            ArrayList<String> rolesList = new ArrayList<>();
            roles.forEach(role -> rolesList.add(role.toString().replace("ROLE_", "")));
            return ResponseEntity.ok(Map.of(
                    "username", authentication.getName(),
                    "roles", rolesList
            ));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(Map.of("message", "Authentication required"), HttpStatusCode.valueOf(401));
        }
    }
}
