package com.example.snowdropserver.Services;

import com.example.snowdropserver.Models.UserPostMappings;
import com.example.snowdropserver.Repositories.UserPostMappingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserPostMappingsService {
    public final UserPostMappingsRepository userPostRepository;

    @Autowired
    public UserPostMappingsService(UserPostMappingsRepository userPostRepository) {
        this.userPostRepository = userPostRepository;
    }

    public List<UserPostMappings> getAllUserPostMappings() {
        // this is the logic for the controller endpoint -- it's a simple service so there isn't much logic
        return userPostRepository.findAll();
    }
}
