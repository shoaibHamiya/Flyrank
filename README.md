# Task API

A simple REST API built with Node.js and Express for creating, reading, updating, and deleting tasks.

The API also includes interactive API documentation using Swagger UI.

## Requirements

* Node.js
* npm

## Installation

Clone the repository:

```bash
git clone https://github.com/shoaibHamiya/Flyrank.git
```

Navigate to the project:

```bash
cd Flyrank/Task-API
```

Install the dependencies:

```bash
npm install
```

## Run the API

Start the server:

```bash
node server.js
```

The API will be available at:

```text
http://localhost:3000
```

Swagger UI documentation is available at:

```text
http://localhost:3000/docs
```

## API Endpoints

| Method | Endpoint     | Description       | Success | Error    |
| ------ | ------------ | ----------------- | ------- | -------- |
| GET    | `/tasks`     | Get all tasks     | 200     | —        |
| GET    | `/tasks/:id` | Get a task by ID  | 200     | 404      |
| POST   | `/tasks`     | Create a new task | 201     | 400      |
| PUT    | `/tasks/:id` | Update a task     | 200     | 400, 404 |
| DELETE | `/tasks/:id` | Delete a task     | 204     | 404      |

## Examples

## API Response Example

Example response from the running API using `curl -i`:

```text
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 134
ETag: W/"86-t5iaUaprLwLt8niSKkKv7cPskc0"
Date: Wed, 26 Aug 2026 10:49:36 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":1,"title":"Learn Node.js","done":false},{"id":2,"title":"Build Task API","done":false},{"id":3,"title":"Test API","done":true}]
```

### Get all tasks

```bash
curl http://localhost:3000/tasks
```

### Get a task by ID

```bash
curl http://localhost:3000/tasks/1
```

### Create a task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express"}'
```

### Update a task

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Swagger","done":true}'
```

### Delete a task

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Validation

Creating a task requires a non-empty `title`.

Example of an invalid request:

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{}'
```

The API returns:

```text
HTTP/1.1 400 Bad Request
```

Updating a task requires at least one of the supported fields: `title` or `done`.

Requests for a task ID that does not exist return:

```text
404 Not Found
```

Successful deletion returns:

```text
204 No Content
```

## Swagger Documentation

Interactive API documentation is available at:

```text
http://localhost:3000/docs
```

Swagger UI provides the following operations:

* `GET /tasks`
* `GET /tasks/{id}`
* `POST /tasks`
* `PUT /tasks/{id}`
* `DELETE /tasks/{id}`

Each endpoint can be tested directly from the Swagger UI using **Try it out**.

## Project Structure

```text
Task-API/
├── .gitignore
├── openapi.json
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Technology

* Node.js
* Express
* Swagger UI
* OpenAPI 3.0
