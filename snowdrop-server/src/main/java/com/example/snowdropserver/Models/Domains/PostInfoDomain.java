package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;

@Value
@Builder
@AllArgsConstructor
public class PostInfoDomain {
    String postTitle;
    String username;
    int totalScore;
    String content;
    int downvotes;
    int upvotes;
    LocalDateTime uploadDate;

    public PostInfoDomain() {
        postTitle = "";
        username = "";
        content = "";
        totalScore = 0;
        uploadDate = LocalDateTime.now();
        downvotes = 0;
        upvotes = 0;
    }
}
