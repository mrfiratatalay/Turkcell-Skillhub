package com.skillhub.catalog.domain;

import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

/** Immutable, indexed snapshot of all content: categories, lessons and the prerequisite graph. */
public final class Catalog {

    private final List<Category> categories;
    private final List<Lesson> lessons;
    private final List<Prerequisite> prerequisites;
    private final Map<Integer, Category> categoriesById;
    private final Map<Integer, Lesson> lessonsById;
    private final Map<String, Lesson> lessonsBySlug;

    public Catalog(List<Category> categories, List<Lesson> lessons, List<Prerequisite> prerequisites) {
        this.categories = categories.stream().sorted(Comparator.comparingInt(Category::sortOrder)).toList();
        this.lessons = lessons.stream()
                .sorted(Comparator.comparingInt(Lesson::categoryId).thenComparingInt(Lesson::sortOrder)).toList();
        this.prerequisites = List.copyOf(prerequisites);
        this.categoriesById = index(this.categories, Category::id);
        this.lessonsById = index(this.lessons, Lesson::id);
        this.lessonsBySlug = index(this.lessons, Lesson::slug);
    }

    public List<Category> categories() {
        return categories;
    }

    public List<Lesson> lessons() {
        return lessons;
    }

    public List<Prerequisite> prerequisites() {
        return prerequisites;
    }

    public Category category(int id) {
        return categoriesById.get(id);
    }

    public Lesson lesson(int id) {
        return lessonsById.get(id);
    }

    public Optional<Lesson> lessonBySlug(String slug) {
        return Optional.ofNullable(lessonsBySlug.get(slug));
    }

    public List<Lesson> lessonsIn(int categoryId) {
        return lessons.stream().filter(l -> l.categoryId() == categoryId).toList();
    }

    public List<Lesson> prerequisitesOf(int lessonId) {
        return prerequisites.stream().filter(p -> p.lessonId() == lessonId).map(p -> lesson(p.prerequisiteId())).toList();
    }

    public List<Lesson> dependentsOf(int lessonId) {
        return prerequisites.stream().filter(p -> p.prerequisiteId() == lessonId).map(p -> lesson(p.lessonId())).toList();
    }

    public int totalXp() {
        return lessons.stream().mapToInt(Lesson::xpReward).sum();
    }

    private static <K, V> Map<K, V> index(List<V> values, Function<V, K> key) {
        return values.stream().collect(Collectors.toMap(key, Function.identity(), (a, b) -> a, LinkedHashMap::new));
    }
}
