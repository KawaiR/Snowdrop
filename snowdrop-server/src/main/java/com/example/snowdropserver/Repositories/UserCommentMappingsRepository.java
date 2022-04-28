package com.example.snowdropserver.Repositories;

import com.example.snowdropserver.Models.Comment;
import com.example.snowdropserver.Models.User;
import com.example.snowdropserver.Models.UserCommentMappings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCommentMappingsRepository extends JpaRepository<UserCommentMappings, Integer> {
    Optional<UserCommentMappings> findByCommentAndUser(Comment comment, User user);
}
