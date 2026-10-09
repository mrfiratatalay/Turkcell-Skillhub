package com.skillhub.demo;

import java.util.List;

/** Fictional learners across Türkiye. Trabzon is well represented: that is where SkillHub was born. */
final class DemoLearners {

    static final String DEMO_EMAIL = "demo@skillhub.dev";
    static final String DEMO_PASSWORD = "gece2025";

    private DemoLearners() {
    }

    /**
     * @param skill       probability of answering a question correctly
     * @param activeDays  distinct learning days within the last four weeks
     * @param lessonGoal  lessons the learner completes before stopping
     * @param streakTail  consecutive days ending today (0 = no live streak)
     * @param nightOwl    sometimes studies after midnight
     */
    record Persona(String name, String email, int cityId, String university, double skill, int activeDays,
                   int lessonGoal, int streakTail, boolean nightOwl) {
    }

    static final List<Persona> ALL = List.of(
            new Persona("Deniz Yıldız", DEMO_EMAIL, 61, "Karadeniz Teknik Üniversitesi", .9, 6, 6, 3, true),
            persona("Elif Demir", 34, "İstanbul Teknik Üniversitesi", .96, 22, 17, 8, true),
            persona("Mert Aydın", 6, "Orta Doğu Teknik Üniversitesi", .9, 18, 14, 5, false),
            persona("Kerem Öztürk", 61, "Karadeniz Teknik Üniversitesi", .9, 16, 13, 4, true),
            persona("Zeynep Çelik", 35, "Ege Üniversitesi", .86, 15, 12, 0, false),
            persona("Ece Kurt", 41, "Kocaeli Üniversitesi", .88, 12, 10, 2, false),
            persona("Selin Arslan", 7, "Akdeniz Üniversitesi", .82, 10, 9, 0, true),
            persona("Nehir Erdem", 53, "Recep Tayyip Erdoğan Üniversitesi", .86, 9, 8, 3, false),
            persona("Emre Şahin", 16, "Bursa Uludağ Üniversitesi", .8, 9, 8, 0, false),
            persona("Sude Yalçın", 61, "Karadeniz Teknik Üniversitesi", .8, 8, 7, 2, true),
            persona("Defne Koç", 26, "Anadolu Üniversitesi", .82, 8, 7, 2, false),
            persona("Ada Yıldırım", 48, "Muğla Sıtkı Koçman Üniversitesi", .84, 7, 6, 0, false),
            persona("Burak Yılmaz", 42, "Selçuk Üniversitesi", .76, 7, 6, 0, true),
            persona("İrem Aksoy", 55, "Ondokuz Mayıs Üniversitesi", .8, 7, 6, 1, false),
            persona("Barış Doğan", 52, "Ordu Üniversitesi", .8, 6, 5, 0, false),
            persona("Melis Taş", 33, "Mersin Üniversitesi", .8, 6, 5, 0, false),
            persona("Duru Aydoğan", 21, "Dicle Üniversitesi", .78, 6, 5, 2, false),
            persona("Can Özdemir", 38, "Erciyes Üniversitesi", .72, 6, 5, 0, false),
            persona("Mira Şen", 17, "Çanakkale Onsekiz Mart Üniversitesi", .83, 5, 4, 0, true),
            persona("Kaan Çetin", 54, "Sakarya Üniversitesi", .76, 5, 4, 0, false),
            persona("Arda Polat", 27, "Gaziantep Üniversitesi", .72, 5, 4, 0, false),
            persona("Yiğit Kılıç", 25, "Atatürk Üniversitesi", .7, 5, 4, 0, true),
            persona("Asya Keskin", 28, "Giresun Üniversitesi", .77, 4, 3, 0, false),
            persona("Efe Aslan", 20, "Pamukkale Üniversitesi", .74, 4, 3, 0, false),
            persona("Ela Korkmaz", 31, "Hatay Mustafa Kemal Üniversitesi", .74, 4, 3, 1, false),
            persona("Ozan Güneş", 65, "Van Yüzüncü Yıl Üniversitesi", .68, 4, 3, 0, false),
            persona("Lina Özkan", 22, "Trakya Üniversitesi", .7, 3, 2, 0, false),
            persona("Tuna Ateş", 8, "Artvin Çoruh Üniversitesi", .69, 3, 2, 0, false),
            persona("Umut Bulut", 44, "İnönü Üniversitesi", .66, 3, 2, 0, false),
            persona("Alp Uçar", 36, "Kafkas Üniversitesi", .65, 2, 1, 0, false));

    private static Persona persona(String name, int cityId, String university, double skill, int activeDays,
                                   int lessonGoal, int streakTail, boolean nightOwl) {
        return new Persona(name, emailOf(name), cityId, university, skill, activeDays, lessonGoal, streakTail,
                nightOwl);
    }

    static String emailOf(String name) {
        String ascii = name.toLowerCase(java.util.Locale.forLanguageTag("tr-TR"))
                .replace('ç', 'c').replace('ğ', 'g').replace('ı', 'i').replace('ö', 'o')
                .replace('ş', 's').replace('ü', 'u').replace(' ', '.');
        return ascii + "@ornek.dev";
    }
}
