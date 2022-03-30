package com.example.snowdropserver.Services;

import com.example.snowdropserver.Exceptions.DuplicateTagException;
import com.example.snowdropserver.Exceptions.PlantNotFoundException;
import com.example.snowdropserver.Models.Plant;
import com.example.snowdropserver.Models.Tag;
import com.example.snowdropserver.Repositories.PlantRepository;
import com.example.snowdropserver.Repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TagService {
    private final TagRepository tagRepository;
    private final PlantRepository plantRepository;

    // this autowired annotation is magic that will link the correct repository into this constructor to make the service
    @Autowired
    public TagService(TagRepository tagRepository, PlantRepository plantRepository) {
        this.tagRepository = tagRepository;
        this.plantRepository = plantRepository;
    }

    public List<Tag> getAllTags() {
        // this is the logic for the controller endpoint -- it's a simple service so there isn't much logic
        return tagRepository.findAll();
    }

    public int addTag(int plantId) {
        Optional<Plant> maybePlant = plantRepository.getById(plantId);

        if (!maybePlant.isPresent()) {
            System.out.println("plant not found");
            throw new PlantNotFoundException();
        }

        Plant plant = maybePlant.get();

        Optional<Tag> maybeTag = tagRepository.getByPlant(plant);
        if (!maybeTag.isEmpty()) {
            System.out.println("tag already exists");
            throw new DuplicateTagException();
        }

        Tag tag = Tag.builder()
                .tagName(plant.getPlantName())
                .scientificName(plant.getScientificName())
                .plant(plant)
                .build();

        tagRepository.save(tag);

        return tag.getId();
    }
}
