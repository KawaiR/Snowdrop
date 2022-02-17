package com.example.snowdropserver.Repositories;

import com.example.snowdropserver.Models.ResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResetTokenRepository extends JpaRepository<ResetToken, Integer> {
}
