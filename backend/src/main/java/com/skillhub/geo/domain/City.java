package com.skillhub.geo.domain;

/** One of Türkiye's 81 provinces; the id is the official licence-plate code. */
public record City(int id, String name, double latitude, double longitude) {
}
