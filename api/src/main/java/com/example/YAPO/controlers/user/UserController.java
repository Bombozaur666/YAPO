package com.example.YAPO.controlers.user;

import com.example.YAPO.models.User.*;
import com.example.YAPO.models.enums.Roles;
import com.example.YAPO.service.JWTService;
import com.example.YAPO.service.RefreshTokenService;
import com.example.YAPO.service.user.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "https://localhost:4200/")
public class UserController {
    private final UserService userService;
    private final JWTService jWTService;
    private final RefreshTokenService refreshTokenService;

    public UserController(UserService userService, JWTService jWTService, RefreshTokenService refreshTokenService) {
        this.userService = userService;
        this.jWTService = jWTService;
        this.refreshTokenService = refreshTokenService;
    }

    @GetMapping("/")
    public User getUserPage(@AuthenticationPrincipal MyUserDetails userDetails) {
        return userDetails.getUser();
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User registerUserPage(@RequestBody @Valid User user){
        return  userService.registerUser(user, Roles.ROLE_USER.toString());
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUserPage(@RequestBody User user) {
        Map<String, Object> response = userService.verifyUser(user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRequest request) {
        var tokens = userService.refresh(request.getRefreshToken());
        return ResponseEntity.ok(tokens);
    }

    @PostMapping("/deactivate")
    public ResponseEntity<?> deactivateUserPage(@AuthenticationPrincipal MyUserDetails userDetails) {
        userService.deactivateUser(userDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPasswordPage(@RequestBody @Valid UsernameField username) {
        userService.forgotPassword(username.getUsername());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reactivate-user")
    public ResponseEntity<?> restoreUserPage(@RequestBody UsernameField usernameField){
        userService.reactivateUser(usernameField.getUsername());
        return ResponseEntity.ok().build();
    }

    @GetMapping( "/enable")
    public ResponseEntity<?> enableUserPage(@RequestParam String token ){
        userService.enableUser(token);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/reset")
    public ResponseEntity<?> resetUserPasswordPage(@RequestParam String token , @RequestBody @Valid PasswordField  passwordField){
        userService.resetUserPassword(token, passwordField);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody TokenRequest request) {
        userService.logout(request.getRefreshToken());
        return ResponseEntity.noContent().build();
    }
}
