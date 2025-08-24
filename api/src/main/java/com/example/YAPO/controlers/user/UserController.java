package com.example.YAPO.controlers.user;

import com.example.YAPO.models.User.*;
import com.example.YAPO.models.enums.Roles;
import com.example.YAPO.service.user.AvatarService;
import com.example.YAPO.service.user.UserService;
import jakarta.validation.Valid;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final AvatarService avatarService;

    public UserController(UserService userService, AvatarService avatarService) {
        this.userService = userService;
        this.avatarService = avatarService;
    }

    @GetMapping("/")
    public User getUserPage(@AuthenticationPrincipal MyUserDetails userDetails) {
        return userDetails.getUser();
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<User> registerUserPage(@RequestBody @Valid User user){
        User _user = userService.registerUser(user, Roles.ROLE_USER.toString());
        return  ResponseEntity.ok(_user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUserPage(@RequestBody User user) {
        Map<String, String> response = userService.verifyUser(user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refreshToken(@RequestBody TokenRequest request) {
        Map<String, String> tokens = userService.refresh(request.getRefreshToken());
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
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> uploadAvatar(@AuthenticationPrincipal MyUserDetails userDetails, @RequestParam("file") MultipartFile file) throws Exception {
        User user = avatarService.uploadAvatar(userDetails.getUser(), file);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/avatar/{fileName}")
    public ResponseEntity<Resource> getAvatar(@PathVariable String fileName) throws Exception {
        Path path = avatarService.getAvatarPath(fileName);
        byte[] bytes = Files.readAllBytes(path);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new ByteArrayResource(bytes));
    }
}
