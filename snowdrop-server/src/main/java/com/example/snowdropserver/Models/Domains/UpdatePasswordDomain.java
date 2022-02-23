package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class UpdatePasswordDomain {
    String email;
    String oldPassword;
    String newPassword;

    public UpdatePasswordDomain() {
        email = null;
        oldPassword = null;
        newPassword = null;
    }
}
