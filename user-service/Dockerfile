# user-service/Dockerfile
# Stage 1: Build
FROM maven:3.8.5-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy parent pom first for better caching
COPY pom.xml .
COPY user-service/pom.xml ./user-service/

# Download dependencies (cached layer)
RUN mvn dependency:go-offline -B -pl user-service -am

# Copy source code
COPY user-service/src ./user-service/src

# Build the application
RUN mvn clean package -DskipTests -pl user-service -am

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser

# Copy JAR from build stage
COPY --from=build --chown=appuser:appgroup \
    /app/user-service/target/*.jar app.jar

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8088/actuator/health || exit 1

# Expose port
EXPOSE 8088

# JVM tuning for containers
ENV JAVA_OPTS="-XX:+UseContainerSupport \
    -XX:MaxRAMPercentage=75.0 \
    -XX:InitialRAMPercentage=50.0 \
    -XX:+UseG1GC \
    -XX:+HeapDumpOnOutOfMemoryError \
    -XX:HeapDumpPath=/tmp/heapdump.hprof"

# Run application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
