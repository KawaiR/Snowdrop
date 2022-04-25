package com.example.snowdropserver.Repositories;

import com.example.snowdropserver.Models.Comment;
import com.example.snowdropserver.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> getBySender(User sender);
}
