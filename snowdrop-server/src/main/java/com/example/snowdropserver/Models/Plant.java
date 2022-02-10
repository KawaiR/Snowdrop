package com.example.snowdropserver.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    String nickname;
    String name;
    String scientificName;

    double temperature;
    int sunlight;
    int water;
    String fertilizer;


    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    User owner;
}
