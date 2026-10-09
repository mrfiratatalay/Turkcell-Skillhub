package com.skillhub.geo.domain;

import java.util.List;
import java.util.Optional;

public interface CityRepository {

    List<City> findAll();

    Optional<City> findById(int id);
}
