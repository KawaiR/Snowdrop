package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;

@Value
@Builder
@AllArgsConstructor
public class PlantCareInfoDomain {
    String nickname;
    double temperature;
    int sunlight;
    LocalDateTime waterCurrent;
    LocalDateTime waterNext;
    String plantHealth;
    String fertilizer;

    public PlantCareInfoDomain() {
        nickname = null;
        temperature = 0;
        sunlight = 0;
        waterCurrent = LocalDateTime.now();
        waterNext = null;
        plantHealth = null;
        fertilizer = null;
    }
}
