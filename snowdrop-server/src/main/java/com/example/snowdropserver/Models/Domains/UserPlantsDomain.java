package com.example.snowdropserver.Models.Domains;

import com.example.snowdropserver.Models.PlantCare;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

import java.util.List;
@Value
@Builder
@AllArgsConstructor
public class UserPlantsDomain {
    List<PlantCare> caredFor;

    public UserPlantsDomain() {
        caredFor = null;
    }
}
