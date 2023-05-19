FROM node:16-alpine AS builder

LABEL maintainer="sebastian.raubach@hutton.ac.uk"

ARG BRANCH=master

# Force docker to not cache the next line
ADD https://api.github.com/repos/cropgeeks/pick-a-mix-client/git/refs/heads/main version.json
# Clone the GridScore server code and client code
RUN echo "Pulling GitHub branch: $BRANCH"
RUN apk add --no-cache git && \
    if [ "$BRANCH" = "master" ] ; then git clone -b "main" --single-branch --depth 1 https://github.com/cropgeeks/pick-a-mix-server.git /opt/pick-a-mix-server ; else git clone -b "$BRANCH" --single-branch --depth 1 https://github.com/cropgeeks/pick-a-mix-server.git /opt/pick-a-mix-server ; fi && \
    if [ "$BRANCH" = "master" ] ; then git clone -b "main" --single-branch --depth 1 https://github.com/cropgeeks/pick-a-mix-client.git /opt/pick-a-mix-client ; else git clone -b "$BRANCH" --single-branch --depth 1 https://github.com/cropgeeks/pick-a-mix-client.git /opt/pick-a-mix-client ; fi

# Build the client code
WORKDIR /opt/pick-a-mix-client
RUN rm -f .env && \
    echo "VUE_APP_BASE_URL=./api/" > .env && \
    apk add --no-cache python3 build-base gcc wget && \
    npm i --legacy-peer-deps && \
    npm run build && \
    mkdir /opt/pick-a-mix-server/client/ && \
    cp -a /opt/pick-a-mix-client/dist/. /opt/pick-a-mix-server/client/

# Download Gradle and build the server code
RUN apk add --no-cache openjdk11 && \
    wget https://services.gradle.org/distributions/gradle-6.0.1-bin.zip -P /tmp/ && \
    unzip /tmp/gradle-6.0.1-bin.zip -d /opt/ && \
    echo "data.directory.external=/data/pick-a-mix" > /opt/pick-a-mix-server/config.properties && \
    echo "project.name=pick-a-mix" >> /opt/pick-a-mix-server/gradle.properties && \
    /opt/gradle-6.0.1/bin/gradle -p /opt/pick-a-mix-server war


FROM tomcat:10.1-jdk11

LABEL maintainer="sebastian.raubach@hutton.ac.uk"

RUN mkdir -p /usr/local/tomcat/webapps && \
    rm -rf /usr/local/tomcat/webapps/ROOT

COPY --from=builder /opt/pick-a-mix-server/build/libs/pick-a-mix-*.war /usr/local/tomcat/webapps/ROOT.war

WORKDIR /usr/local/tomcat/
