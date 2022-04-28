package com.example.snowdropserver.Services;

import com.example.snowdropserver.Models.UserCommentMappings;
import com.example.snowdropserver.Models.UserPostMappings;
import com.example.snowdropserver.Repositories.UserCommentMappingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserCommentMappingsService {
    public final UserCommentMappingsRepository userCommentRepository;

    @Autowired
    public UserCommentMappingsService(UserCommentMappingsRepository userCommentRepository) {
        this.userCommentRepository = userCommentRepository;
    }

    public List<UserCommentMappings> getAllUserCommentMappings() {
        // this is the logic for the controller endpoint -- it's a simple service so there isn't much logic
        return userCommentRepository.findAll();
    }
}
