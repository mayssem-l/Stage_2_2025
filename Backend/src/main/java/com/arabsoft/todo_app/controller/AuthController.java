package com.arabsoft.todo_app.controller;

import com.arabsoft.todo_app.dao.entities.User;
import com.arabsoft.todo_app.dto.AuthRequest;
import com.arabsoft.todo_app.dto.AuthResponse;
import com.arabsoft.todo_app.dto.RegisterRequest;
import com.arabsoft.todo_app.service.Implementation.UserServiceImpl;
import com.arabsoft.todo_app.service.Interface.AuthService;
import com.arabsoft.todo_app.service.Interface.TaskService;
import com.arabsoft.todo_app.util.jwt.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        String username = request.username();
        String password = request.password();

        String token = this.authService.login(username, password);

        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
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
            return ResponseEntity.badRequest().body(Map.of("message", "Authentication required"));
        }
    }
}
