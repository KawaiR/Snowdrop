package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class GetPostInfoDomain {
    String username;
    int postId;

    public GetPostInfoDomain() {
        username = null;
        postId = 0;
    }
}
