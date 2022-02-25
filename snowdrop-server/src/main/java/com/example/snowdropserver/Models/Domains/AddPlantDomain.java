package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class AddPlantDomain {
    String userName;
    String plantHealth;
    String nickname;

    public AddPlantDomain() {
        userName = null;
        plantHealth = null;
        nickname = null;
    }
}
