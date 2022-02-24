package com.example.snowdropserver.Controllers;

import com.example.snowdropserver.Models.Domains.AddUserPlantDomain;
import com.example.snowdropserver.Models.Domains.PlantInfoDomain;
import com.example.snowdropserver.Models.Plant;
import com.example.snowdropserver.Services.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// the server will look to map requests that start with "/plants" to the endpoints in this controller
@RequestMapping(value = "/plants", produces = "application/json; charset=utf-8")
public class PlantController {
    private final PlantService plantService;

    @Autowired
    public PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    // @GetMapping maps HTTP GET requests on the endpoint to this method
    // Because no url value has been specified, this is mapping the class-wide "/plants" url
    @GetMapping
    public List<Plant> getAllPlants() {
        // Have the logic in PlantService
        // Ideally, PlantController should just control the request mappings
        return plantService.getAllPlants();
    }

    @GetMapping(value = "/{id}/get-plant-info")
    public PlantInfoDomain getPlantInfo(@PathVariable int id) {
        return plantService.getPlantInfo(id);
    }

    @PostMapping(value = "/{id}/add-plant")
    public void AddUserPlant(@PathVariable int id, @RequestBody String username) {
        plantService.addUserPlant(id, username);
    }
}
