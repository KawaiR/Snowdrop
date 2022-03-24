package com.example.snowdropserver.Repositories;

import com.example.snowdropserver.Models.Post;
import com.example.snowdropserver.Models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> getByTag(Tag tag);
}
