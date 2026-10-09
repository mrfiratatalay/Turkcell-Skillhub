package com.skillhub.geo.infrastructure;

import com.skillhub.geo.domain.City;
import com.skillhub.geo.domain.CityRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
class JdbcCityRepository implements CityRepository {

    private static final String SELECT = "SELECT id, name, latitude, longitude FROM cities";

    private final JdbcClient jdbc;

    JdbcCityRepository(JdbcClient jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public List<City> findAll() {
        return jdbc.sql(SELECT + " ORDER BY id").query(City.class).list();
    }

    @Override
    public Optional<City> findById(int id) {
        return jdbc.sql(SELECT + " WHERE id = :id").param("id", id).query(City.class).optional();
    }
}
