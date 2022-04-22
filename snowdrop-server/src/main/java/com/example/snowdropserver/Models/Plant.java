package com.example.snowdropserver.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "plants")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(name="plant_name")
    String plantName;
    @Column(name="scientific_name")
    String scientificName;

    @Column(name = "plant_image")
    String plantImage;

    // VL: Very low, L: Low, M: Moderate, H: High
    @Column(name = "water_needs")
    String waterNeeds;

    // A: Acidic, N: Neutral, B: Basic
    @Column(name="soil_type")
    String soilType;

    // UV
    // 1-2: Low, 3-5: Moderate, 6-7: High, 8-10: Very High, 11+: Extreme
    @Column(name="sunlight_level")
    int sunlightLevel;

    // from USDA database
    @Column(name="min_temperature")
    double minTemperature;

    // 1: full shade, 2: partial shade, 3: no shade
    @Column(name="reported_sunlight")
    int reportedSunlight;

    // N: Novice, B: Beginner, I: Intermediate, E: Enthusiast, X: Expert, A: Advanced
    @Column(name="difficulty")
    String difficulty;

//    @OneToMany(mappedBy = "plant")
//    @ToString.Exclude
//    List<PlantCare> caredFor;

    public int getId() {
        return id;
    }

    public String getPlantName() {
        return plantName;
    }

    public String getScientificName() {
        return scientificName;
    }

    public String getPlantImage() {
        return plantImage;
    }

    public String getWaterNeeds() {
        return waterNeeds;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setPlantName(String plantName) {
        this.plantName = plantName;
    }

    public void setScientificName(String scientificName) {
        this.scientificName = scientificName;
    }

    public void setPlantImage(String plantImage) {
        this.plantImage = plantImage;
    }

    public void setWaterNeeds(String waterNeeds) {
        this.waterNeeds = waterNeeds;
    }
}
