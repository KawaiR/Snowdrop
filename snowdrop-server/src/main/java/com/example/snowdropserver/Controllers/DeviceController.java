package com.example.snowdropserver.Controllers;

import com.example.snowdropserver.Models.Domains.*;
import com.example.snowdropserver.Models.Device;
import com.example.snowdropserver.Services.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
// the server will look to map requests that start with "/devices" to the endpoints in this controller
@RequestMapping(value = "/devices", produces = "application/json; charset=utf-8")
public class DeviceController {
    private final DeviceService deviceService;

    @Autowired
    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    // @GetMapping maps HTTP GET requests on the endpoint to this method
    // Because no url value has been specified, this is mapping the class-wide "/users" url
    @GetMapping
    public List<Device> getAllDevices() {
        // Have the logic in UserService
        // Ideally, UserController should just control the request mappings
        return deviceService.getAllDevices();
    }



    // @PostMapping maps the HTTP put requests on the endpoint to this method
    // it calls the service method and ultimately adds the user to the database
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DeviceDomain addUser(@RequestBody DeviceDomain device) {
        return deviceService.updateDevice(device);
    }

    @PostMapping(value="/remove")
    public DeviceDomain removeDevice(@RequestBody DeviceDomain device) {
        return deviceService.removeDevice(device);
    }
}
