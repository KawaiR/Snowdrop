package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class VoteOnPostDomain {
    String username;
    int upvote;

    VoteOnPostDomain() {
        username = null;
        upvote = 1;
    }
}
