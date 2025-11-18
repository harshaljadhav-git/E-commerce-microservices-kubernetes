# Build stage
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
# The -am flag also builds project dependencies
RUN mvn -pl shipping-service -am clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
# The path to the jar file will be inside the module's target directory
COPY --from=build /app/shipping-service/target/shipping-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8087
ENTRYPOINT ["java","-jar","app.jar"]
