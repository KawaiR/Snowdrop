package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;

@Value
@Builder
@AllArgsConstructor
public class WaterSchedulesDomain {
    int plantCareId;
    String nickname;
    LocalDateTime waterNext;

    public WaterSchedulesDomain() {
        plantCareId = 0;
        nickname = null;
        waterNext = null;
    }
}
