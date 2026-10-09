package com.skillhub.catalog.infrastructure;

import com.skillhub.catalog.domain.CatalogRepository;
import com.skillhub.catalog.domain.Category;
import com.skillhub.catalog.domain.Difficulty;
import com.skillhub.catalog.domain.Lesson;
import com.skillhub.catalog.domain.LessonContent;
import com.skillhub.catalog.domain.Prerequisite;
import com.skillhub.shared.error.DomainException;
import java.sql.Array;
import java.sql.SQLException;
import java.util.List;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
class JdbcCatalogRepository implements CatalogRepository {

    private final JdbcClient jdbc;

    JdbcCatalogRepository(JdbcClient jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public List<Category> categories() {
        return jdbc.sql("SELECT id, slug, name, constellation, description, icon, sort_order FROM categories")
                .query(Category.class).list();
    }

    @Override
    public List<Lesson> lessons() {
        return jdbc.sql("""
                        SELECT l.id, l.slug, l.category_id, l.title, l.summary, l.difficulty, l.duration_min,
                               l.xp_reward, l.star_x, l.star_y, l.sort_order,
                               (SELECT count(*) FROM questions q WHERE q.lesson_id = l.id) AS question_count
                        FROM lessons l""")
                .query((rs, row) -> new Lesson(rs.getInt("id"), rs.getString("slug"), rs.getInt("category_id"),
                        rs.getString("title"), rs.getString("summary"), Difficulty.valueOf(rs.getString("difficulty")),
                        rs.getInt("duration_min"), rs.getInt("xp_reward"), rs.getInt("star_x"), rs.getInt("star_y"),
                        rs.getInt("sort_order"), rs.getInt("question_count")))
                .list();
    }

    @Override
    public List<Prerequisite> prerequisites() {
        return jdbc.sql("SELECT lesson_id, prerequisite_id FROM lesson_prerequisites").query(Prerequisite.class).list();
    }

    @Override
    public LessonContent content(int lessonId) {
        return jdbc.sql("SELECT objectives, paragraphs, video_id FROM lessons WHERE id = :id")
                .param("id", lessonId)
                .query((rs, row) -> new LessonContent(texts(rs.getArray("objectives")),
                        texts(rs.getArray("paragraphs")), rs.getString("video_id")))
                .optional()
                .orElseThrow(() -> new DomainException.NotFound("Ders içeriği bulunamadı."));
    }

    @Override
    public List<Integer> ancestorIds(int lessonId) {
        return jdbc.sql("""
                        WITH RECURSIVE ancestors (id, depth) AS (
                            SELECT prerequisite_id, 1 FROM lesson_prerequisites WHERE lesson_id = :lessonId
                            UNION
                            SELECT p.prerequisite_id, a.depth + 1
                            FROM lesson_prerequisites p
                            JOIN ancestors a ON p.lesson_id = a.id
                        )
                        SELECT id FROM ancestors GROUP BY id ORDER BY max(depth) DESC, id""")
                .param("lessonId", lessonId)
                .query(Integer.class).list();
    }

    private static List<String> texts(Array array) throws SQLException {
        return List.of((String[]) array.getArray());
    }
}
