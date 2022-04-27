package com.example.snowdropserver.Repositories;

import com.example.snowdropserver.Models.Post;
import com.example.snowdropserver.Models.User;
import com.example.snowdropserver.Models.UserPostMappings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserPostMappingsRepository extends JpaRepository<UserPostMappings, Integer> {
    List<UserPostMappings> findByUser(User user);
    Optional<UserPostMappings> findByPostAndUser(Post post, User user);
    List<UserPostMappings> findByPost(Post post);
}
