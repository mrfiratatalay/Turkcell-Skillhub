package com.skillhub.geo.web;

import com.skillhub.geo.application.CityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/cities")
@Tag(name = "Şehirler")
class CityController {

    private final CityService cities;

    CityController(CityService cities) {
        this.cities = cities;
    }

    @GetMapping
    @Operation(summary = "81 il (Türkçe alfabetik sırada)")
    List<CityResponse> list() {
        return cities.listAlphabetically().stream().map(c -> new CityResponse(c.id(), c.name())).toList();
    }

    record CityResponse(int id, String name) {
    }
}
