package com.example.YAPO.controlers.user;

import com.example.YAPO.models.User.*;
import com.example.YAPO.models.enums.Roles;
import com.example.YAPO.service.JWTService;
import com.example.YAPO.service.user.MyUserDetailService;
import com.example.YAPO.service.user.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "https://localhost:4200/")
public class UserController {
    private final UserService userService;
    private final JWTService jWTService;

    public UserController(UserService userService, JWTService jWTService) {
        this.userService = userService;
        this.jWTService = jWTService;
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
        String response = userService.verifyUser(user);
        return !Objects.equals(response, "fail") ? ResponseEntity.ok(Map.of("token", response)) : ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRequest request) {
        String refreshToken = request.getRefreshToken();
        String username = jWTService.extractUsername(refreshToken);

        UserDetails userDetails = userService.loadUserByUsername(username);

        if (jWTService.validateToken(refreshToken, userDetails)) {
            String newAccessToken = jWTService.generateToken(username);
            return ResponseEntity.ok(Map.of("token", newAccessToken));
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired refresh token");
        }
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
}
