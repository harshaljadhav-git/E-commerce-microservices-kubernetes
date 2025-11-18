FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy
COPY --from=build /target/notification-service-0.0.1-SNAPSHOT.jar notification-service.jar
EXPOSE 8085
ENTRYPOINT ["java","-jar","notification-service.jar"]
