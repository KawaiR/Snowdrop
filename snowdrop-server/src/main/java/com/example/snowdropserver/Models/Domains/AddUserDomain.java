package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class AddUserDomain {
    String email;
    String passwordHash;
    String userName;

    public AddUserDomain() {
        this.email = "";
        this.passwordHash = "";
        this.userName = "";
    }
}