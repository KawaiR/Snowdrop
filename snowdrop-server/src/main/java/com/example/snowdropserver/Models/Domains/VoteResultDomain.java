package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class VoteResultDomain {
    int newScore;
    int upvotes;
    int downvotes;

    public VoteResultDomain() {
        newScore = 0;
        upvotes = 0;
        downvotes = 0;
    }
}