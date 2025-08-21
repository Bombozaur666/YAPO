package com.example.YAPO.repositories;

import com.example.YAPO.models.User.RefreshToken;
import com.example.YAPO.models.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    long deleteByUser(User user);
}
