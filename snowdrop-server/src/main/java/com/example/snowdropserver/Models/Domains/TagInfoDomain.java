package com.example.snowdropserver.Models.Domains;

import com.example.snowdropserver.Models.Plant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class TagInfoDomain {
    String tagName;
    String scientificName;
    Plant plant;
}
