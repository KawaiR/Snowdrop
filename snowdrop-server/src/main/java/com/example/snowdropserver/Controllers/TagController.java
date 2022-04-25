package com.example.snowdropserver.Controllers;

import com.example.snowdropserver.Models.Domains.TagInfoDomain;
import com.example.snowdropserver.Models.Tag;
import com.example.snowdropserver.Services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// the server will look to map requests that start with "/tags" to the endpoints in this controller
@RequestMapping(value = "/tags", produces = "application/json; charset=utf-8")
public class TagController {
    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    // @GetMapping maps HTTP GET requests on the endpoint to this method
    // Because no url value has been specified, this is mapping the class-wide "/tags" url
    @GetMapping
    public List<Tag> getAllTags() {
        // Have the logic in TagService
        // Ideally, TagController should just control the request mappings
        return tagService.getAllTags();
    }

    @PostMapping(value = "/{plantId}/add-tag")
    @ResponseStatus(HttpStatus.CREATED)
    public int addTag(@PathVariable int plantId) {
        return tagService.addTag(plantId);
    }

    @GetMapping(value = "/get-tags")
    public List<Tag> getTags() {
        return tagService.getAllTags();
    }
}
