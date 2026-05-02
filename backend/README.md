# Equipment Lending Backend

Java Spring Boot backend for the Equipment Lending Portal assignment.

## Tech Stack

- Java 17+
- Spring Boot 3.2.5
- Spring Web
- Spring Data JPA
- H2 Database
- Bean Validation
- Swagger UI / OpenAPI

## Default Demo Users

| Role | Email | Password |
|---|---|---|
| ADMIN | admin@school.com | admin123 |
| STUDENT | student@school.com | student123 |
| STAFF | staff@school.com | staff123 |

## Dummy Data

The backend automatically seeds:

- 6 demo users
- 200 equipment records
- 3 sample borrow requests

## Run

```cmd
cd backend
mvn spring-boot:run
```

Or double click:

```cmd
run-backend.cmd
```

Backend runs on:

```text
http://localhost:8080
```

## H2 Console

```text
http://localhost:8080/h2-console
```

Use:

```text
JDBC URL: jdbc:h2:mem:equipmentdb
Username: sa
Password: leave empty
```

## Swagger UI

```text
http://localhost:8080/swagger-ui.html
```

## API Endpoints

### Auth

```http
POST /api/auth/login
POST /api/auth/register
```

### Equipment

```http
GET    /api/equipment
GET    /api/equipment/{id}
POST   /api/equipment
PUT    /api/equipment/{id}
DELETE /api/equipment/{id}
```

### Borrow Requests

```http
GET  /api/requests
GET  /api/requests/user/{userId}
POST /api/requests
PUT  /api/requests/{requestId}/status
```

## Sample Login Request

```json
{
  "email": "admin@school.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

## Sample Create Borrow Request

```json
{
  "equipmentId": 1,
  "userId": 2
}
```

## Sample Update Status Request

```json
{
  "status": "APPROVED"
}
```

Valid statuses:

```text
PENDING, APPROVED, REJECTED, RETURNED
```
