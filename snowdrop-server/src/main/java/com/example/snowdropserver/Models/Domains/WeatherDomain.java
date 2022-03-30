package com.example.snowdropserver.Models.Domains;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherDomain {
    double temp_c;
    double temp_f;
    int humidity;
    int uv;
    @SuppressWarnings("unchecked")
    @JsonProperty("current")
    private void unpackNested(Map<String,Object> brand) {
        this.temp_c = (double) brand.get("temp_c");
        this.temp_f = (double) brand.get("temp_f");
        this.humidity = (int) brand.get("humidity");
        this.uv = (int)(double)brand.get("uv");
    }

    @Override
    public String toString() {
        return "WeatherDomain{" +
                "temp_c=" + temp_c +
                ", temp_f=" + temp_f +
                ", humidity=" + humidity +
                ", uv=" + uv +
                '}';
    }
}