package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class AuthConfirmDomain {
    private String authTokenHash;
    private String userName;
    private int userId;

    public AuthConfirmDomain() {
        authTokenHash = null;
        userName = null;
        userId = 0;
    }
}
