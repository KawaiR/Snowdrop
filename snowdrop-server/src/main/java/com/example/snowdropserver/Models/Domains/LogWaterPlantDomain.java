package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class LogWaterPlantDomain {
    String username;

    public LogWaterPlantDomain() {
        username = null;
    }
}
