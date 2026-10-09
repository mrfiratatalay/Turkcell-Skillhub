package com.skillhub.catalog.domain;

/** A skill area, drawn on the sky as a constellation. */
public record Category(int id, String slug, String name, String constellation, String description, String icon,
                       int sortOrder) {
}
