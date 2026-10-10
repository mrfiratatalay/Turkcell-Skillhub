package com.skillhub.geo.application;

import com.skillhub.geo.domain.City;
import com.skillhub.geo.domain.CityRepository;
import com.skillhub.shared.error.DomainException;
import java.text.Collator;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import org.springframework.stereotype.Service;

@Service
public class CityService {

    private static final Collator TURKISH = Collator.getInstance(Locale.forLanguageTag("tr-TR"));

    private final CityRepository cities;

    public CityService(CityRepository cities) {
        this.cities = cities;
    }

    /** Alphabetical in Turkish (Ç after C, İ after I...), which SQL's default collation gets wrong. */
    public List<City> listAlphabetically() {
        return cities.findAll().stream().sorted(Comparator.comparing(City::name, TURKISH)).toList();
    }

    public City require(int id) {
        return cities.findById(id)
                .orElseThrow(() -> new DomainException.Invalid("Geçerli bir şehir seçmelisin.", "cityId"));
    }
}
