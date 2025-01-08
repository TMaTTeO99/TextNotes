# retrieve base image
FROM openjdk:23-jdk

# add a label
LABEL maintainer="matteo@server.com"

# set work directory
WORKDIR /app

# copy my jarfile on my work directory
COPY target/TextNotes.jar TextNotes.jar 

# Set command to run
CMD ["java", "-jar", "TextNotes.jar"]
