package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class SetNicknameDomain {
    int plantCareId;
    String nickname;

    public SetNicknameDomain() {
        plantCareId = 0;
        nickname = null;
    }
}
