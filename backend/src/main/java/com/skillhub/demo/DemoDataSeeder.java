package com.skillhub.demo;

import com.skillhub.demo.DemoLearners.Persona;
import com.skillhub.identity.application.PasswordHasher;
import com.skillhub.identity.domain.NewUser;
import com.skillhub.identity.domain.User;
import com.skillhub.identity.domain.UserRepository;
import java.time.Clock;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

/**
 * Seeds a living demo exactly once: only into an empty database, all-or-nothing in one transaction.
 * (The hackathon version re-imported CSVs on every boot and silently overwrote real progress.)
 */
@Component
@ConditionalOnProperty(name = "app.demo-data.enabled", havingValue = "true")
class DemoDataSeeder implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DemoDataSeeder.class);
    private static final long SEED = 20251120L; // Code Night Trabzon: 20 November 2025

    private final UserRepository users;
    private final PasswordHasher passwords;
    private final LearningSimulator simulator;
    private final TransactionTemplate transactions;
    private final Clock clock;

    DemoDataSeeder(UserRepository users, PasswordHasher passwords, LearningSimulator simulator,
                   TransactionTemplate transactions, Clock clock) {
        this.users = users;
        this.passwords = passwords;
        this.simulator = simulator;
        this.transactions = transactions;
        this.clock = clock;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (users.count() > 0) {
            log.info("Demo data skipped: database already has users");
            return;
        }
        long started = System.currentTimeMillis();
        int attempts = transactions.execute(status -> seed());
        log.info("Demo data ready: {} learners, {} quiz attempts in {} ms. Demo login: {} / {}",
                DemoLearners.ALL.size(), attempts, System.currentTimeMillis() - started,
                DemoLearners.DEMO_EMAIL, DemoLearners.DEMO_PASSWORD);
    }

    private int seed() {
        Instant now = Instant.now(clock);
        String sharedHash = passwords.hash(DemoLearners.DEMO_PASSWORD);
        Random random = new Random(SEED);
        int attempts = 0;
        for (Persona persona : DemoLearners.ALL) {
            Instant joined = now.minus(30 + random.nextInt(20), ChronoUnit.DAYS);
            User user = users.insert(new NewUser(persona.email(), sharedHash, persona.name(), persona.cityId(),
                    persona.university(), joined));
            attempts += simulator.simulate(user.id(), persona, random, now);
        }
        return attempts;
    }
}
