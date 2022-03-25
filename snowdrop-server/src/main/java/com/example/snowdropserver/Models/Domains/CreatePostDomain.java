package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class CreatePostDomain {
    String username;
    String postTitle;
    String content;
    int plantId;

    public CreatePostDomain() {
        username = null;
        postTitle = null;
        content = null;
        plantId = 0;
    }
}
