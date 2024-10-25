FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/biblioteca-0.0.1.jar
COPY ${JAR_FILE} app_biblioteca.jar
EXPOSE 8001
ENTRYPOINT ["java", "-jar", "app_biblioteca.jar"]