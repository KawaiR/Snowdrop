package com.example.snowdropserver.Services;

import com.example.snowdropserver.Models.Tag;
import com.example.snowdropserver.Repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    private final TagRepository tagRepository;

    // this autowired annotation is magic that will link the correct repository into this constructor to make the service
    @Autowired
    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> getAllTags() {
        // this is the logic for the controller endpoint -- it's a simple service so there isn't much logic
        return tagRepository.findAll();
    }
}
