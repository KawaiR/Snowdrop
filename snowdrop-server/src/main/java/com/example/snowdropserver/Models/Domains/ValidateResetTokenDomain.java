package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class ValidateResetTokenDomain {
    String email;
    String resetToken;

    public ValidateResetTokenDomain() {
        email = null;
        resetToken = null;
    }
}
