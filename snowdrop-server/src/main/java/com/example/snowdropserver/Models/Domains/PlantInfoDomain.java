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

    public PlantInfoDomain() {
        plantImage = null;
        scientificName = null;
        plantName = null;
        waterNeeds = null;
    }
}
