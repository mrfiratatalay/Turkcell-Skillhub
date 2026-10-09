package com.skillhub.guide.infrastructure;

import com.anthropic.client.AnthropicClient;
import com.anthropic.core.JsonValue;
import com.anthropic.models.messages.MessageCreateParams;
import com.anthropic.models.messages.StructuredMessage;
import com.anthropic.models.messages.StructuredMessageCreateParams;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.skillhub.guide.application.AiGuide;
import com.skillhub.guide.domain.LearnerProfile;
import com.skillhub.guide.domain.Recommendation;
import com.skillhub.guide.domain.Recommendation.Kind;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import tools.jackson.databind.json.JsonMapper;

/**
 * Claude-backed night guide (official Anthropic Java SDK, structured outputs).
 * The model only sees the learner's real progress and may only point at lessons the learner can open;
 * anything else is rejected here, so a hallucinated lesson can never reach the UI.
 */
class ClaudeGuide implements AiGuide {

    private static final String SYSTEM_PROMPT = """
            Sen SkillHub'ın Gece Rehberi'sin: Turkcell Code Night ruhunu taşıyan, gençlere dijital beceri öğreten \
            bir platformun samimi ve motive edici mentorusun. Öğrenci profiline bakıp tam olarak 3 öneri üret.
            Kurallar:
            - Yalnızca profildeki verileri kullan; olmayan bir ders, puan ya da başarı uydurma.
            - lessonSlug alanına yalnızca "available", "retry" ya da "polish" listelerindeki bir slug yaz.
            - STREAK önerisini yalnızca streakDays > 0 ve activeToday false ise ver; o öneride lessonSlug boş olsun.
            - title en fazla 40, reason en fazla 160 karakter olsun. Türkçe, "sen" diliyle, samimi ama abartısız yaz.
            - Her öneri farklı bir derse ya da farklı bir amaca odaklansın.""";

    private final AnthropicClient client;
    private final String model;
    private final JsonMapper json;

    ClaudeGuide(AnthropicClient client, String model, JsonMapper json) {
        this.client = client;
        this.model = model;
        this.json = json;
    }

    record GuideDraft(@JsonPropertyDescription("Tam olarak 3 öneri") List<Draft> recommendations) {
    }

    record Draft(Kind kind,
                 @JsonPropertyDescription("En fazla 40 karakterlik kısa başlık") String title,
                 @JsonPropertyDescription("En fazla 160 karakterlik, veriye dayalı gerekçe") String reason,
                 @JsonPropertyDescription("available veya retry listesinden slug; STREAK için boş") String lessonSlug) {
    }

    @Override
    public String modelName() {
        return model;
    }

    @Override
    public List<Recommendation> recommend(LearnerProfile profile) {
        StructuredMessageCreateParams<GuideDraft> params = MessageCreateParams.builder()
                .model(model)
                .maxTokens(16000L)
                .system(SYSTEM_PROMPT)
                .addUserMessage("Öğrenci profili (JSON):\n" + json.writeValueAsString(profile))
                // Server-side refusal fallback: a declined request is retried on Anthropic's recommended model.
                .putAdditionalHeader("anthropic-beta", "server-side-fallback-2026-07-01")
                .putAdditionalBodyProperty("fallbacks", JsonValue.from("default"))
                .outputConfig(GuideDraft.class)
                .build();
        StructuredMessage<GuideDraft> message = client.messages().create(params);
        if (message.stopReason().map(reason -> "refusal".equals(reason.asString())).orElse(false)) {
            throw new IllegalStateException("Guide request was declined by the model");
        }
        GuideDraft draft = message.content().stream()
                .flatMap(block -> block.text().stream())
                .map(text -> text.text())
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Guide response had no structured text"));
        return validate(draft, profile);
    }

    /** Keeps only drafts that point at real, reachable lessons; fails loudly so the service can fall back. */
    private static List<Recommendation> validate(GuideDraft draft, LearnerProfile profile) {
        Map<String, String> titles = new HashMap<>();
        profile.available().forEach(l -> titles.put(l.slug(), l.title()));
        profile.retry().forEach(l -> titles.put(l.slug(), l.title()));
        profile.polish().forEach(l -> titles.put(l.slug(), l.title()));
        List<Recommendation> valid = new ArrayList<>();
        Set<String> used = new HashSet<>();
        for (Draft d : draft.recommendations() == null ? List.<Draft>of() : draft.recommendations()) {
            boolean habit = d.kind() == Kind.STREAK;
            String slug = d.lessonSlug() == null || d.lessonSlug().isBlank() ? null : d.lessonSlug().strip();
            boolean lessonOk = habit ? slug == null : slug != null && titles.containsKey(slug) && used.add(slug);
            if (d.kind() == null || isBlank(d.title()) || isBlank(d.reason()) || !lessonOk || valid.size() == 3) {
                continue;
            }
            valid.add(new Recommendation(d.kind(), clip(d.title(), 60), clip(d.reason(), 220), slug,
                    slug == null ? null : titles.get(slug), 100 - valid.size() * 10));
        }
        if (valid.isEmpty()) {
            throw new IllegalStateException("Guide response contained no valid recommendation");
        }
        return valid;
    }

    private static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private static String clip(String value, int max) {
        String trimmed = value.strip();
        return trimmed.length() <= max ? trimmed : trimmed.substring(0, max - 1) + "…";
    }
}
