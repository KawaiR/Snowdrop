package com.example.snowdropserver.Repositories;

import com.example.snowdropserver.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findAllByUserName(String username);
    List<User> findAllByEmail(String email);
}
