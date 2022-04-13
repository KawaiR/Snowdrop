package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class UsernameDomain {
    String username;

    public UsernameDomain() {
        username = null;
    }
}
