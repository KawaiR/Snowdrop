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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public int getSunlight() {
        return sunlight;
    }

    public void setSunlight(int sunlight) {
        this.sunlight = sunlight;
    }

    public LocalDateTime getWaterCurrent() {
        return waterCurrent;
    }

    public void setWaterCurrent(LocalDateTime waterCurrent) {
        this.waterCurrent = waterCurrent;
    }

    public LocalDateTime getWaterLast() {
        return waterLast;
    }

    public void setWaterLast(LocalDateTime waterLast) {
        this.waterLast = waterLast;
    }

    public LocalDateTime getWaterNext() {
        return waterNext;
    }

    public void setWaterNext(LocalDateTime waterNext) {
        this.waterNext = waterNext;
    }

    public String getPlantHealth() {
        return plantHealth;
    }

    public void setPlantHealth(String plantHealth) {
        this.plantHealth = plantHealth;
    }

    public String getFertilizer() {
        return fertilizer;
    }

    public void setFertilizer(String fertilizer) {
        this.fertilizer = fertilizer;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Plant getPlant() {
        return plant;
    }

    public void setPlant(Plant plant) {
        this.plant = plant;
    }
}
