package com.skillhub.catalog.domain;

import java.util.List;

public interface CatalogRepository {

    List<Category> categories();

    List<Lesson> lessons();

    List<Prerequisite> prerequisites();

    LessonContent content(int lessonId);

    /** Every ancestor in the prerequisite DAG, deepest first (resolved with a recursive CTE). */
    List<Integer> ancestorIds(int lessonId);
}
