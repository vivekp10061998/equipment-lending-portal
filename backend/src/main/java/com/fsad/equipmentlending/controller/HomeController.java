package com.fsad.equipmentlending.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
                "message", "Equipment Lending Portal Backend is running",
                "swagger", "http://localhost:8080/swagger-ui.html",
                "h2Console", "http://localhost:8080/h2-console",
                "equipmentApi", "http://localhost:8080/api/equipment"
        );
    }
}