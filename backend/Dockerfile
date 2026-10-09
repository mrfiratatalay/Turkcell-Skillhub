# syntax=docker/dockerfile:1.7
# ---- build: compile with the Maven wrapper; dependencies cached between builds ----
FROM eclipse-temurin:25-jdk AS build
WORKDIR /workspace
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN --mount=type=cache,target=/root/.m2 ./mvnw -B -q dependency:go-offline
COPY src/ src/
RUN --mount=type=cache,target=/root/.m2 ./mvnw -B -q -DskipTests package \
    && cp target/skillhub-api-*.jar app.jar

# ---- runtime: slim JRE, non-root user ----
FROM eclipse-temurin:25-jre
RUN groupadd --system skillhub && useradd --system --gid skillhub --home /app skillhub
WORKDIR /app
COPY --from=build /workspace/app.jar app.jar
USER skillhub
EXPOSE 8080
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75 -XX:+ExitOnOutOfMemoryError"
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
