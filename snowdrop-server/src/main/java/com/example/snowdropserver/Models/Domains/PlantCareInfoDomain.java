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
    double sunlight;
    LocalDateTime waterCurrent;
    LocalDateTime waterNext;
    String plantHealth;
    int reportedExposure;
    String fertilizer;

    public PlantCareInfoDomain() {
        nickname = null;
        temperature = 0;
        sunlight = 0;
        reportedExposure = 0;
        waterCurrent = LocalDateTime.now();
        waterNext = null;
        plantHealth = null;
        fertilizer = null;
    }
}
