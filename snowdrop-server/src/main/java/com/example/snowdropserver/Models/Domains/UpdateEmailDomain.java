package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class UpdateEmailDomain {
    String oldEmail;
    String newEmail;
    String emailToken;
}
