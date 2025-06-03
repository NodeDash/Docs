---
sidebar_position: 1
---

# Docker Compose

NodeDash can be installed using Docker Compose for a simple all in one deployment which is suitable for
development and evaluation purposes and also small production deployments where high availability or autoscaling
is not a requirement.

## System Requirements

Before installing NodeDash, ensure your Docker host meets these requirements:

### Minimum Requirements

- **CPU**: 2 cores
- **CPU Architecture**: x86_64 or arm64
- **RAM**: 4 GB
- **Storage**: 20 GB
- **Operating System**: Linux Recommended
- **Container Runtime**: Docker or alternative compatible with Docker Compose

### Recommended Requirements

- **CPU**: 4+ cores
- **RAM**: 8+ GB
- **Storage**: 50+ GB (SSD preferred)

## Components

NodeDash Docker Compose files will configure the following components;

- **Volumes**:
  - **postgres_data**: Stores PostgreSQL database content
  - **valkey_data**: ValKey data store
- **Containers**:
  - **Postgres**: Runs PostgreSQL database
  - **Valkey**: Runs ValKey datastore
  - **Migrations**: Runs once at start to perform database migrations
  - **UX**: Serves NodeDash User Interface on Port 8080
  - **API**: Serves NodeDash API on Port 8081
  - **Ingest**: Service NodeDash Ingest Service on Port 8082
  - **Service**: Runs NodeDash backend processing service

## Installation

### Checkout Docker Compose File

The latest Docker Compose file for NodeDash can be found at the following URL;

`https://raw.githubusercontent.com/NodeDash/Docker-Compose/refs/heads/main/docker-compose.yaml`

If you require a specific release of NodeDash use the following URL substituing \<VERSION\> with
the version of NodeDash you desire;

`https://raw.githubusercontent.com/NodeDash/Docker-Compose/refs/tags/<VERSION>/docker-compose.yaml`

### Edit Configuration Variables

You will need to customise the NodeDash installation prior to starting, this can be achieved by editing the
following variables within the docker-compose.yaml file under the API.

- `WEBSITE_ADDRESS`: eg app.mysite.com
- `API_ADDRESS`: eg api.mysite.com
- `INGEST_ADDRESS`: eg ingest.mysite.com
- `SECRET_KEY`: Change to a secure random string - make sure to change under API and ingest
- `DATABASE_URL`: Adjust if using a different database configuration (only change if you want to use an external database)
- `VITE_API_URL`: URL the frontend should use to contact the API

- `EMAIL_MODE`: choose between MAILGUN and SMTP for sending system emails
- `FROM_EMAIL`: eg noreply@mysite.com
- `FROM_NAME`: MySite

SET these if you pick MAILGUN

- `MAILGUN_API_KEY`: set this if you choose MAILGUN for email mode
- `MAILGUN_DOMAIN`: set this if you choose MAILGUN for email mode
- `MAILGUN_REGION`: set this if you choose MAILGUN for email mode, eu or us

Set these if you pick SMTP mode

- `SMTP_HOST`: SMTP hostname
- `SMTP_PORT`: port
- `SMTP_USER`: username
- `SMTP_PASSWORD`: password

### Run the containers

```bash
docker compose create
docker compose start
```

### Validate Access to the Application

Open a web browser and navigate to `http://localhost:8080`

## Reviewing Application Logs

Application logs can be reviewed via the Docker logs command... First list the containers running to find the containers
name.

```bash
docker ps
```

Copy the container name for the service you wish to review logs for and pass it to the docker logs command...

```bash
docker logs ux
```

The relevant logs are returned.

```bash
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: IPv6 listen already enabled
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
2025/05/25 09:42:49 [notice] 1#1: using the "epoll" event method
2025/05/25 09:42:49 [notice] 1#1: nginx/1.28.0
2025/05/25 09:42:49 [notice] 1#1: built by gcc 14.2.0 (Alpine 14.2.0)
2025/05/25 09:42:49 [notice] 1#1: OS: Linux 6.12.5-linuxkit
2025/05/25 09:42:49 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
2025/05/25 09:42:49 [notice] 1#1: start worker processes
2025/05/25 09:42:49 [notice] 1#1: start worker process 22
2025/05/25 09:42:49 [notice] 1#1: start worker process 23
2025/05/25 09:42:49 [notice] 1#1: start worker process 24
2025/05/25 09:42:49 [notice] 1#1: start worker process 25
2025/05/25 09:42:49 [notice] 1#1: start worker process 26
2025/05/25 09:42:49 [notice] 1#1: start worker process 27
2025/05/25 09:42:49 [notice] 1#1: start worker process 28
2025/05/25 09:42:49 [notice] 1#1: start worker process 29
192.168.65.1 - - [25/May/2025:09:44:46 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36" "-"
192.168.65.1 - - [25/May/2025:09:44:46 +0000] "GET /assets/index-DmmIFjUi.js HTTP/1.1" 304 0 "http://localhost:8080/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36" "-"
192.168.65.1 - - [25/May/2025:09:44:46 +0000] "GET /assets/index-B6R6tz8U.css HTTP/1.1" 304 0 "http://localhost:8080/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36" "-"
192.168.65.1 - - [25/May/2025:09:44:46 +0000] "GET /device-manager-icon.svg HTTP/1.1" 304 0 "http://localhost:8080/login?redirect=%2F" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36" "-"
```

## Upgrade Version

To upgrade to a newer version first run remove the current versions containers using the Docker Compose file for the
currently installed version.

```bash
    docker compose down
```

This leaves the underlying volumes intact and these will be reused in the new version causing no data loss.

Fetch the Docker Compose file for the version you'd like to upgrade to and then run;

```bash
docker compose create
docker compose start
```

The new version will come up and run database migrations upon your existing database to upgrade it's schema before
starting the new version of the application.

## Remove Installation

If you wish to remove NodeDash from your Docker host the easiest method is via Docker Compose.
Run the following command to tear down the containers.

```bash
    docker compose down
```

This command stops and removes the containers but leaves the volumes intact incase you wish to run the application again in the
future without losing your current data.
