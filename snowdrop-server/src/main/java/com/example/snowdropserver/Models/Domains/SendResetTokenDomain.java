package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class SendResetTokenDomain {
    String email;

    public SendResetTokenDomain() {
        email = null;
    }
}
