package com.example.snowdropserver.Repositories;

import com.example.snowdropserver.Models.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Integer> {
    Optional<Device> getByExpoPushToken(String expoPushToken);
    void removeDeviceByExpoPushToken(String expoPushToken);
}
