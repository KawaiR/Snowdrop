package com.example.snowdropserver.Repositories;

import com.example.snowdropserver.Models.ResetToken;
import com.example.snowdropserver.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ResetTokenRepository extends JpaRepository<ResetToken, Integer> {
    Optional<ResetToken> findByHashedTokenAndUser(String hashedToken, User user);
    List<ResetToken> findByExpiryDate(LocalDateTime now);
}
