Base URL:
http://localhost:8080

Swagger URL:
http://localhost:8080/swagger-ui.html


## Auth APIs

POST /api/auth/login
POST /api/auth/register

## Equipment APIs

GET /api/equipment
GET /api/equipment/{id}
POST /api/equipment
PUT /api/equipment/{id}
DELETE /api/equipment/{id}

## Borrow Request APIs

GET /api/requests
GET /api/requests/user/{userId}
POST /api/requests
PUT /api/requests/{id}/status