package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class PlantUpdateDomain {
    int id;
    int sunlightLevel;
    double minTemperature;
    String soilType;
    String waterNeeds;

    public PlantUpdateDomain() {
        this.id = -1;
        this.sunlightLevel = -1;
        this.minTemperature = -1;
        this.soilType = null;
        this.waterNeeds = null;
    }
}