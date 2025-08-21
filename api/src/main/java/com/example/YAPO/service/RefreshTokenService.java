package com.example.YAPO.service;

import com.example.YAPO.models.User.RefreshToken;
import com.example.YAPO.models.User.User;
import com.example.YAPO.models.enums.ErrorList;
import com.example.YAPO.repositories.RefreshTokenRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Optional;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepo refreshTokenRepo;
    private final long refreshValidityDays = 7;

    public RefreshTokenService(RefreshTokenRepo refreshTokenRepo) {
        this.refreshTokenRepo = refreshTokenRepo;
    }
    private String generateSecureToken() {
        byte[] bytes = new byte[64]; // 512 bit
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    @Transactional
    public RefreshToken issueToken(User user) {
        RefreshToken rt = new RefreshToken();
        rt.setUser(user);
        rt.setToken(generateSecureToken());
        rt.setExpiryDate(Instant.now().plus(refreshValidityDays, ChronoUnit.DAYS));
        rt.setRevoked(false);
        return refreshTokenRepo.save(rt);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepo.findByToken(token);
    }

    @Transactional(readOnly = true)
    public RefreshToken verify(RefreshToken token) {
        if (token.isRevoked() || token.getExpiryDate().isBefore(Instant.now())) {
            throw new IllegalStateException(ErrorList.REFRESHMENT_EXPIRED.toString());
        }
        return token;
    }

    @Transactional
    public RefreshToken rotate(RefreshToken oldToken) {
        oldToken.setRevoked(true);
        refreshTokenRepo.save(oldToken);
        return issueToken(oldToken.getUser());
    }

    @Transactional
    public void revoke(RefreshToken token) {
        token.setRevoked(true);
        refreshTokenRepo.save(token);
    }

    @Transactional
    public void revokeAllForUser(User user) {
        refreshTokenRepo.deleteByUser(user);
    }
}
