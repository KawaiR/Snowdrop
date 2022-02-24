package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class LoginDomain {
    private String email;
    private String password;

    public LoginDomain() {
        email = null;
        password = null;
    }
}
