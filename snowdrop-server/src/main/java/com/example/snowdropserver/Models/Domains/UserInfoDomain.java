package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class UserInfoDomain {
    String username;
    String email;
    int totalPoints;
    int editorPrivilege;
}
