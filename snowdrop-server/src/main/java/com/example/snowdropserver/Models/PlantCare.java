package com.example.snowdropserver.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @Column(name = "water_current")
    LocalDateTime waterCurrent;

    @Column(name = "water_last")
    LocalDateTime waterLast;

    @Column(name = "water_next")
    LocalDateTime waterNext;

    @Column(name = "plant_health")
    String plantHealth;

    String fertilizer;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    User user;

    @JsonIgnore
    @ManyToOne
    Plant plant;
}
