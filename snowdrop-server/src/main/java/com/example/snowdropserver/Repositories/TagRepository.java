package com.example.snowdropserver.Repositories;

import com.example.snowdropserver.Models.Domains.TagInfoDomain;
import com.example.snowdropserver.Models.Plant;
import com.example.snowdropserver.Models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    Optional<Tag> getByPlant(Plant plant);
    Optional<Tag> getById(int tagId);
}
