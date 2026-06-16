# Disaster Relief Resource Coordination System

[![Java](https://img.shields.io/badge/Java-17-blue.svg)](https://openjdk.org/projects/jdk/17/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Kafka](https://img.shields.io/badge/Kafka-3.6-red.svg)](https://kafka.apache.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green.svg)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Overview

The **Disaster Relief Resource Coordination System** is a full-stack web application designed to help emergency response organizations coordinate resources during natural disasters. The system handles high volumes of emergency requests (food, shelter, medical, volunteer assistance) and matches them with available resources in real-time.

**Key Features:**
-  Submit and track emergency requests
-  Real-time resource matching algorithm
-  Role-based access control (Coordinator, Volunteer, Administrator)
-  Kafka event-driven architecture for high scalability
-  Geospatial location-based search
-  Email notifications
-  RESTful APIs with OpenAPI documentation
-  Redis caching for performance
-  Audit logging for compliance

---

##  Prerequisites

- **Java 17** or higher
- **Docker** and **Docker Compose** (for local development)
- **Maven 3.8+** (for building backend)
- **Git**

---

## Quick Start

### Option 1: Run with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/Prithuk/drrcs.git
cd disaster-relief-platform

# Start all services (Kafka, MongoDB, PostgreSQL, Redis, Backend)
docker-compose up -d

# Verify all containers are running
docker-compose ps

# Backend API will be available at: http://localhost:8080
# Swagger UI: http://localhost:8080/swagger-ui.html
