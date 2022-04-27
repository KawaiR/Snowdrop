package com.example.snowdropserver.Models.Domains;

import com.example.snowdropserver.Models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class UserInfoDomain {
    String username;
    String email;
    int totalPoints;
    int editorPrivilege;
    String expertiseLevel;

    public UserInfoDomain() {
        username = "";
        email = "";
        totalPoints = 0;
        editorPrivilege = 0;
        expertiseLevel = "";
    }
}
