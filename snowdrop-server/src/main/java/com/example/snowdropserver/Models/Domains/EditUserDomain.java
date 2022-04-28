package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class EditUserDomain {
    int editorPrivilege;
    int totalScore;
    String expertiseLevel;

    public EditUserDomain() {
        editorPrivilege = 0;
        totalScore = 0;
        expertiseLevel = "Novice";
    }
}
