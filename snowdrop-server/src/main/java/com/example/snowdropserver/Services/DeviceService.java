package com.example.snowdropserver.Services;

import com.example.snowdropserver.Models.Device;
import com.example.snowdropserver.Models.Domains.DeviceDomain;
import com.example.snowdropserver.Models.Domains.WeatherDomain;
import com.example.snowdropserver.Models.PlantCare;
import com.example.snowdropserver.Models.User;
import com.example.snowdropserver.Repositories.DeviceRepository;
import com.example.snowdropserver.Repositories.PlantCareRepository;
import com.example.snowdropserver.Repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@EnableScheduling
public class DeviceService {
    private final DeviceRepository deviceRepository;
    private final UserRepository userRepository;
    private final PlantCareRepository plantCareRepository;
    // this autowired annotation is magic that will link the correct repository into this constructor to make the service
    @Autowired
    public DeviceService(DeviceRepository deviceRepository,UserRepository userRepository, PlantCareRepository plantCareRepository) {
        this.deviceRepository = deviceRepository;
        this.userRepository = userRepository;
        this.plantCareRepository = plantCareRepository;
    }
    // 1000 is one second. right now set to per hour
    @Scheduled(fixedRate = 3600, initialDelay = 0, timeUnit = TimeUnit.SECONDS)
    public void SendNotification() {
        for (Device device:getAllDevices()) {
            WeatherDomain weatherDomain = getWeather(device.getLocation());
            if (weatherDomain == null) continue;
            for (PlantCare userPlant: plantCareRepository.getByUser(device.getUser())) {
                double scale = ((double)userPlant.getReportedExposure() - 1.0) / 2.0; // 0 is inside 0.5 is half 1 is outside
                if (scale > 0.5 && weatherDomain.getTemp_f() < userPlant.getPlant().getMinTemperature()) {
                    SendNotification(
                            device.getExpoPushToken(),
                            "Weather Alert for "+userPlant.getNickname(),
                            "Your Plant needs higher temperature!\n"+
                                    "\tCurrent Temperature: "+weatherDomain.getTemp_f()+"\u00B0F\n"+
                                    "\tMinimum Required Temperature: "+userPlant.getPlant().getMinTemperature()+"\u00B0F"
                    );
                }
                double average_uv = updateUV((double) weatherDomain.getUv() * scale,userPlant);
                if (average_uv > userPlant.getPlant().getSunlightLevel() + 3 && average_uv < userPlant.getPlant().getSunlightLevel() - 3) {
                    SendNotification(
                            device.getExpoPushToken(),
                            "Weather Alert for "+userPlant.getNickname(),
                            "Your Plant need to change position\n"+
                                    "\tCurrent UV: "+(double)weatherDomain.getUv()+"\n"+
                                    "\tAverage Exposed UV: "+average_uv+"\n"+
                                    "\tRecommended Exposure: "+userPlant.getPlant().getSunlightLevel()
                    );
                }
            }

        }
    }

    public double updateUV(double current_uv, PlantCare userPlant) {
        userPlant.setSunlightThird(userPlant.getSunlightSecond());
        userPlant.setSunlightSecond(userPlant.getSunlight());
        userPlant.setSunlight(current_uv);
        double n = 1.0;
        double sum = current_uv;
        if (userPlant.getSunlightSecond() != -1) {
            n += 1.0;
            sum += userPlant.getSunlightSecond();
        }
        if (userPlant.getSunlightThird() != -1) {
            n += 1.0;
            sum += userPlant.getSunlightThird();
        }
        return sum/n;
    }

    public WeatherDomain getWeather(String location) {
        HttpURLConnection connection = null;
        BufferedReader reader;
        String line;
        StringBuffer responseContent = new StringBuffer();
        ObjectMapper mapper = new ObjectMapper();

        // Create a neat value object to hold the URL
        try {
            URL url = new URL("http://api.weatherapi.com/v1/current.json?key=0a5a11da31f34220b9d172820222701&q="+location+"&aqi=no");
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(5000);
            int status = connection.getResponseCode();
            System.out.println("Get Weather Status: "+status);
            if (status != 200) {
                reader = new BufferedReader(new InputStreamReader(connection.getErrorStream()));
                while ((line = reader.readLine())!=null) {
                    responseContent.append(line);
                }
                reader.close();
            } else {
                WeatherDomain weatherDomain = mapper.readValue(connection.getInputStream(), WeatherDomain.class);
                return weatherDomain;
            }
            System.out.println(responseContent.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            connection.disconnect();
        }
        return null;
    }

    public void SendNotification(String expoPushToken, String title, String body) {
        HttpURLConnection connection = null;
        BufferedReader reader;
        String line;
        StringBuffer responseContent = new StringBuffer();
        ObjectMapper mapper = new ObjectMapper();

        // Create a neat value object to hold the URL
        try {
            URL url = new URL("https://exp.host/--/api/v2/push/send");
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestProperty("Accept-encoding","gzip, deflate");
            connection.setRequestProperty("Content-Type","application/json");
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(5000);
            connection.setDoOutput(true);
            JSONObject message = new JSONObject();
            message.put("to",expoPushToken);
            message.put("sound","default");
            message.put("title",title);
            message.put("body",body);
            message.put("channelId","default");
            try(OutputStream os = connection.getOutputStream()) {
                OutputStreamWriter osw = new OutputStreamWriter(os, "UTF-8");
                osw.write(message.toString());
                osw.flush();
                osw.close();
            }
            int status = connection.getResponseCode();
            System.out.println("Send Notification Status: "+status);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        } finally {
            connection.disconnect();
        }
    }

    public List<Device> getAllDevices() {
        // this is the logic for the controller endpoint -- it's a simple service so there isn't much logic
        return deviceRepository.findAll();
    }

    public DeviceDomain updateDevice(DeviceDomain deviceDomain) {
        Optional<Device> deviceOptional = deviceRepository.getByExpoPushToken(deviceDomain.getExpoPushToken());
        if (deviceOptional.isEmpty()) {
            return addDevice(deviceDomain);
        }
        Optional<User> userOptional = userRepository.getByUserName(deviceDomain.getUsername());
        Device device = deviceOptional.get();
        device.setLocation(deviceDomain.getLocation());
        device.setUser(userOptional.get());
        deviceRepository.save(device);
        return deviceDomain;
    }

    public DeviceDomain addDevice(DeviceDomain deviceDomain) {
        System.out.println("addDevice:");
        System.out.println("\t username: "+deviceDomain.getUsername());
        System.out.println("\t expoToken: "+deviceDomain.getExpoPushToken());
        Optional<User> userOptional = userRepository.getByUserName(deviceDomain.getUsername());
        Device device = Device.builder()
                .expoPushToken(deviceDomain.getExpoPushToken())
                .location(deviceDomain.getLocation())
                .user(userOptional.get())
                .build();
        deviceRepository.save(device);
        return deviceDomain;
    }

    @Transactional
    public DeviceDomain removeDevice(DeviceDomain deviceDomain) {
        Optional<Device> deviceOptional = deviceRepository.getByExpoPushToken(deviceDomain.getExpoPushToken());
        if (deviceOptional.isEmpty()) return deviceDomain;
        Device device = deviceOptional.get();
        device.setUser(null);
        deviceRepository.delete(device);
        DeviceDomain domain = new DeviceDomain(null,null,null);
        return domain;
    }
}
