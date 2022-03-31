package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class SunlightExposureDomain {
    String username;
    int reportedSunlight;

    public SunlightExposureDomain() {
        username = null;
        reportedSunlight = 0;
    }
}
