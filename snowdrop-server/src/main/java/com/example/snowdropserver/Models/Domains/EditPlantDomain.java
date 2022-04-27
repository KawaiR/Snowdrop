package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class EditPlantDomain {
    String plantImage;
    String waterNeeds;
    String soilType;
    int sunlightLevel;
    int reportedSunlight;
    double minTemperature;
    String difficulty;

    String username;

    public EditPlantDomain() {
        plantImage = "n/a";
        waterNeeds = "n/a";
        soilType = "n/a";
        reportedSunlight = 0;
        sunlightLevel = 0;
        minTemperature = 0;
        difficulty = "n/a";
        username = "";
    }
}
