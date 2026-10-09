-- SkillHub v2 schema.
-- Design notes:
--   * XP lives in an append-only ledger (xp_events); totals and rankings are derived, never copied.
--   * Lesson prerequisites form a DAG; the API walks it with a recursive CTE.
--   * Every timestamp is TIMESTAMPTZ; "local day" logic (streaks) is computed in Europe/Istanbul.

CREATE TABLE cities (
    id        SMALLINT     PRIMARY KEY CHECK (id BETWEEN 1 AND 81),
    name      VARCHAR(40)  NOT NULL UNIQUE,
    latitude  NUMERIC(7,4) NOT NULL CHECK (latitude BETWEEN 35 AND 43),
    longitude NUMERIC(7,4) NOT NULL CHECK (longitude BETWEEN 25 AND 45)
);

CREATE TABLE users (
    id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(254) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    display_name  VARCHAR(60)  NOT NULL,
    city_id       SMALLINT     NOT NULL REFERENCES cities (id),
    university    VARCHAR(120),
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX ux_users_email ON users (lower(email));
CREATE INDEX ix_users_city ON users (city_id);

CREATE TABLE categories (
    id            SMALLINT     PRIMARY KEY,
    slug          VARCHAR(40)  NOT NULL UNIQUE,
    name          VARCHAR(60)  NOT NULL,
    constellation VARCHAR(60)  NOT NULL,
    description   VARCHAR(300) NOT NULL,
    icon          VARCHAR(30)  NOT NULL,
    sort_order    SMALLINT     NOT NULL
);

CREATE TABLE lessons (
    id           SMALLINT     PRIMARY KEY,
    slug         VARCHAR(80)  NOT NULL UNIQUE,
    category_id  SMALLINT     NOT NULL REFERENCES categories (id),
    title        VARCHAR(120) NOT NULL,
    summary      VARCHAR(300) NOT NULL,
    objectives   TEXT[]       NOT NULL,
    paragraphs   TEXT[]       NOT NULL,
    video_id     VARCHAR(20),
    difficulty   VARCHAR(12)  NOT NULL CHECK (difficulty IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')),
    duration_min SMALLINT     NOT NULL CHECK (duration_min > 0),
    xp_reward    SMALLINT     NOT NULL CHECK (xp_reward > 0),
    star_x       SMALLINT     NOT NULL CHECK (star_x BETWEEN 0 AND 1000),
    star_y       SMALLINT     NOT NULL CHECK (star_y BETWEEN 0 AND 600),
    sort_order   SMALLINT     NOT NULL
);
CREATE INDEX ix_lessons_category ON lessons (category_id);

CREATE TABLE lesson_prerequisites (
    lesson_id       SMALLINT NOT NULL REFERENCES lessons (id) ON DELETE CASCADE,
    prerequisite_id SMALLINT NOT NULL REFERENCES lessons (id) ON DELETE CASCADE,
    PRIMARY KEY (lesson_id, prerequisite_id),
    CHECK (lesson_id <> prerequisite_id)
);
CREATE INDEX ix_prerequisites_prerequisite ON lesson_prerequisites (prerequisite_id);

CREATE TABLE questions (
    id          INTEGER  PRIMARY KEY,
    lesson_id   SMALLINT NOT NULL REFERENCES lessons (id) ON DELETE CASCADE,
    position    SMALLINT NOT NULL,
    prompt      TEXT     NOT NULL,
    explanation TEXT     NOT NULL,
    UNIQUE (lesson_id, position)
);

CREATE TABLE question_options (
    id          INTEGER  PRIMARY KEY,
    question_id INTEGER  NOT NULL REFERENCES questions (id) ON DELETE CASCADE,
    position    SMALLINT NOT NULL CHECK (position BETWEEN 1 AND 4),
    label       TEXT     NOT NULL,
    is_correct  BOOLEAN  NOT NULL DEFAULT false,
    UNIQUE (question_id, position)
);
-- Exactly one correct option per question, enforced by the database itself.
CREATE UNIQUE INDEX ux_options_single_correct ON question_options (question_id) WHERE is_correct;

CREATE TABLE quiz_attempts (
    id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id        UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    lesson_id      SMALLINT    NOT NULL REFERENCES lessons (id),
    score          SMALLINT    NOT NULL CHECK (score BETWEEN 0 AND 100),
    correct_count  SMALLINT    NOT NULL CHECK (correct_count >= 0),
    question_count SMALLINT    NOT NULL CHECK (question_count > 0),
    passed         BOOLEAN     NOT NULL,
    completed_at   TIMESTAMPTZ NOT NULL
);
CREATE INDEX ix_attempts_user_lesson ON quiz_attempts (user_id, lesson_id);
CREATE INDEX ix_attempts_user_time ON quiz_attempts (user_id, completed_at DESC);

CREATE TABLE attempt_answers (
    attempt_id  UUID    NOT NULL REFERENCES quiz_attempts (id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL REFERENCES questions (id),
    option_id   INTEGER NOT NULL REFERENCES question_options (id),
    is_correct  BOOLEAN NOT NULL,
    PRIMARY KEY (attempt_id, question_id)
);

CREATE TABLE xp_events (
    id         BIGINT      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id    UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    amount     INTEGER     NOT NULL CHECK (amount > 0),
    reason     VARCHAR(30) NOT NULL,
    lesson_id  SMALLINT    REFERENCES lessons (id),
    attempt_id UUID        REFERENCES quiz_attempts (id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX ix_xp_events_user ON xp_events (user_id, created_at);

CREATE TABLE badges (
    code        VARCHAR(40)  PRIMARY KEY,
    name        VARCHAR(60)  NOT NULL,
    description VARCHAR(200) NOT NULL,
    hint        VARCHAR(200) NOT NULL,
    icon        VARCHAR(30)  NOT NULL,
    tier        VARCHAR(10)  NOT NULL CHECK (tier IN ('GOLD', 'NEON')),
    secret      BOOLEAN      NOT NULL DEFAULT false,
    sort_order  SMALLINT     NOT NULL
);

CREATE TABLE user_badges (
    user_id    UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    badge_code VARCHAR(40) NOT NULL REFERENCES badges (code),
    awarded_at TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (user_id, badge_code)
);
