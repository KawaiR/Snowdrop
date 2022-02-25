package com.example.snowdropserver.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_plant_mappings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
//@EqualsAndHashCode(exclude = {"user", "plant"})
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
    @ToString.Exclude
    User user;

    @JsonIgnore
    @ManyToOne
    @ToString.Exclude
    Plant plant;
/*
    @Override
    public String toString() {
        return "PlantCare{" +
                "id:" + id +
                ",nickname:" + nickname +
                ",temperature:" + temperature +
                ",sunlight:" + sunlight +
                ",waterCurrent:" + waterCurrent +
                ",waterLast:" + waterLast +
                ",waterNext:" + waterNext +
                ",plantHealth:" + plantHealth +
                ",fertilizer:" + fertilizer +
                "}";
    }
 */
}
