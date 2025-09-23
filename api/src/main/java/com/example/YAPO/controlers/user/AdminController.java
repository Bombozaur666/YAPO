package com.example.YAPO.controlers.user;

import com.example.YAPO.models.User.User;
import com.example.YAPO.models.enums.Roles;
import com.example.YAPO.service.user.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<String> adminHomePage() {
        return ResponseEntity.ok("Admin Page");
    }

    @PostMapping("/create-admin")
    public ResponseEntity<User> createAdminPage(@RequestBody @Valid User user) {
        User _user =  userService.registerUser(user, Roles.ROLE_ADMIN.toString());
        return ResponseEntity.ok(_user);
    }

    @PostMapping("/ban-user/{userId}")
    public ResponseEntity<Void> banUserPage(@PathVariable Long userId) {
        userService.banUser(userId);
        return ResponseEntity.ok().build();
    }

}
