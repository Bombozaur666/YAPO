# build api wiith gradle
FROM gradle:8.14.3-jdk-21-and-24-alpine AS builder
COPY src src
COPY build.gradle .
COPY settings.gradle .
RUN gradle build

## Deploy built war on tomcat
FROM openjdk:24
RUN mkdir app
WORKDIR app
COPY --from=builder /home/gradle/build/libs/YAPO-0.0.1-SNAPSHOT.jar ./ROOT.jar
CMD ["java", "-jar", "ROOT.jar"]