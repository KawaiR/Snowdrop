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
