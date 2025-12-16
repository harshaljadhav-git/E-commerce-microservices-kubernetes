# Build stage
# Use a specific Maven version for reproducibility
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the entire project context
# This is better than copying poms and source separately
COPY . .

# Build the specific module and its dependencies
# The -am flag also builds project dependencies from the reactor
RUN mvn -pl api-gateway -am clean package -DskipTests

# Runtime stage
# Use a slim JRE image for a smaller final image
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Copy the built jar from the build stage
# The path to the jar file will be inside the module's target directory
COPY --from=build /app/api-gateway/target/api-gateway-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the application runs on
EXPOSE 8888

# Run the application
ENTRYPOINT ["java","-jar","app.jar"]
