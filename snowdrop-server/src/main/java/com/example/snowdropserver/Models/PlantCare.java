package com.example.snowdropserver.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user_plant_mappings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlantCare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String nickname;
    double temperature;
    int sunlight;
    int water;
    String fertilizer;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    User user;

    @JsonIgnore
    @ManyToOne
    Plant plant;
}
