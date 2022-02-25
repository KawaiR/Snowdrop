package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;

@Value
@Builder
@AllArgsConstructor
public class WaterPlantDomain {
    LocalDateTime waterNext;

    public WaterPlantDomain() {
        waterNext = null;
    }
}
