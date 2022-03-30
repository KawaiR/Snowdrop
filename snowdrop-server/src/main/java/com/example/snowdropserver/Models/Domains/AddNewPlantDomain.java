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


    public AddNewPlantDomain() {
        commonName = null;
        scientificName = null;
        plantImageUrl = null;
    }
}
