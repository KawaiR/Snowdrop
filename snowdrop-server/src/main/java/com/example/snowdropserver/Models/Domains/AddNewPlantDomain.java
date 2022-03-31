package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class AddNewPlantDomain {
    String commonName;
    String scientificName;
    String plantImageUrl;
    String waterNeeds;
    String soilType;
    int sunlightLevel;
    double minTemperature;
    int reportedSunlight;

    public AddNewPlantDomain() {
        commonName = null;
        scientificName = null;
        plantImageUrl = null;
        waterNeeds = null;
        soilType = null;
        sunlightLevel = 0;
        minTemperature = 0;
        reportedSunlight = 0;
    }
}
