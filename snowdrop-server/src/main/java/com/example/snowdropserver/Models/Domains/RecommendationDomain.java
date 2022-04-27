package com.example.snowdropserver.Models.Domains;

import com.example.snowdropserver.Models.Plant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

import java.util.List;
@Value
@Builder
@AllArgsConstructor
public class RecommendationDomain {
    List<Plant> toRecommend;
    String expertiseLevel;

    public RecommendationDomain() {
        toRecommend = null;
        expertiseLevel = "";
    }
}
