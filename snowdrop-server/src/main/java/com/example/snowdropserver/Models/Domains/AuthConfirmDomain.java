package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class AuthConfirmDomain {
    private String authTokenHash;
    private String userName;

    public AuthConfirmDomain() {
        authTokenHash = null;
        userName = null;
    }
}
