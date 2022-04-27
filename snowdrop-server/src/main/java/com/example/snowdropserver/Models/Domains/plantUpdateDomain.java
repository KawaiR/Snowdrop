package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class plantUpdateDomain {
    int id;
    int sunlightLevel;
    double minTemperature;
    String soilType;
    String waterNeeds;

    public plantUpdateDomain() {
        this.id = -1;
        this.sunlightLevel = -1;
        this.minTemperature = -1;
        this.soilType = null;
        this.waterNeeds = null;
    }
}