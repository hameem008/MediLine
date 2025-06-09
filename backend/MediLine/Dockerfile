# Use a JDK base image
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY . .

# Build the Spring Boot app
RUN ./mvnw package -DskipTests

# Expose the port your app runs on
EXPOSE 8081

# Run the app
CMD ["java", "-jar", "target/MediLine-0.0.1-SNAPSHOT.jar"]
