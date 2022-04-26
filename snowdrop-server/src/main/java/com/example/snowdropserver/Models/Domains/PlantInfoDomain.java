package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class PlantInfoDomain {
    String plantName;
    String scientificName;
    String plantImage;
    String waterNeeds;
    String soilType;
    int sunlightLevel;
    int reportedSunlight;
    double minTemperature;
    String difficulty;

    public PlantInfoDomain() {
        plantImage = null;
        scientificName = null;
        plantName = null;
        waterNeeds = null;
        soilType = null;
        sunlightLevel = 0;
        reportedSunlight = 0;
        minTemperature = 0;
        difficulty = null;
    }
}
