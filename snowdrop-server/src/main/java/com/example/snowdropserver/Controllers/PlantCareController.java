package com.example.snowdropserver.Controllers;

import com.example.snowdropserver.Models.Plant;
import com.example.snowdropserver.Models.PlantCare;
import com.example.snowdropserver.Services.PlantCareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
// the server will look to map requests that start with "/plant-care" to the endpoints in this controller
@RequestMapping(value = "/plant-care", produces = "application/json; charset=utf-8")
public class PlantCareController {
    public final PlantCareService plantCareService;

    @Autowired
    public PlantCareController(PlantCareService plantCareService) {
        this.plantCareService = plantCareService;
    }

    // @GetMapping maps HTTP GET requests on the endpoint to this method
    // Because no url value has been specified, this is mapping the class-wide "/plant-caer" url
    @GetMapping
    public List<PlantCare> getAllPlantCare() {
        // Have the logic in PlantService
        // Ideally, PlantController should just control the request mappings
        return plantCareService.getAllPlantCare();
    }
}
