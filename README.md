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


W-3 Assignment 
# Task API — SQLite Database

A simple CRUD API built with Node.js and Express. This version replaces the in-memory task list with a persistent SQLite database using `better-sqlite3`.

## Features

* Create tasks
* Read all tasks
* Read a task by ID
* Update tasks
* Delete tasks
* Persistent SQLite database storage
* Automatic database and table creation
* Automatic insertion of example tasks when the database is empty
* OpenAPI documentation

## Technologies

* Node.js
* Express.js
* SQLite
* better-sqlite3
* OpenAPI

## Why SQLite?

SQLite was chosen because it is lightweight, simple to use, and does not require a separate database server.

The database is stored in a single local file, which makes SQLite suitable for this small Task API project while still providing real database persistence.

## Database

The SQLite database file is:

```text
tasks.db
```

It is automatically created in the project directory when the application starts.

The database contains a `tasks` table with:

| Column | Type    | Description                                 |
| ------ | ------- | ------------------------------------------- |
| id     | INTEGER | Primary key                                 |
| title  | TEXT    | Task title                                  |
| done   | INTEGER | Completion status (`0` = false, `1` = true) |

The `tasks.db` file is included in `.gitignore` so each user can automatically create their own local database when running the project.

## API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/tasks`     | Get all tasks     |
| GET    | `/tasks/:id` | Get a task by ID  |
| POST   | `/tasks`     | Create a new task |
| PUT    | `/tasks/:id` | Update a task     |
| DELETE | `/tasks/:id` | Delete a task     |

## How to Start

Clone the repository and navigate to the project directory:

```bash
cd Task-API
```

Install the dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

The API will be available at:

```text
http://localhost:3000
```

The database will automatically be created when the application starts.

## Example Request

Create a task:

```http
POST /tasks
Content-Type: application/json
```

Request body:

```json
{
  "title": "Learn SQLite"
}
```

Example response:

```json
{
  "id": 4,
  "title": "Learn SQLite",
  "done": false
}
```

## SQLite SQL Example

One of the SQL queries executed during this assignment was:

```sql
SELECT * FROM tasks WHERE done = 1;
```

This query returns only the tasks that are marked as completed.

Other SQL queries explored during the assignment included:

```sql
SELECT * FROM tasks;
```

```sql
SELECT COUNT(*) FROM tasks;
```

```sql
UPDATE tasks SET done = 1;
```

```sql
DELETE FROM tasks WHERE done = 1;
```

## Database Screenshot

The SQLite database was opened and inspected using DB Browser for SQLite.

![SQLite Database Screenshot](database-screenshot.png)

## OpenAPI Documentation

The API documentation is available through the project's OpenAPI specification in:

```text
openapi.json
```

## Project Structure

```text
Task-API/
├── .gitignore
├── database-screenshot.png
├── openapi.json
├── package.json
├── package-lock.json
├── README.md
├── server.js
└── tasks.db
```

`tasks.db` is generated locally and is ignored by Git.

## Assignment 2 Progress

* Stage 0 — Create SQLite database ✅
* Stage 1 — Database read endpoints ✅
* Stage 2 — Insert into database ✅
* Stage 3 — Update and delete with SQL ✅
* Stage 4 — Explored SQLite ✅
* Stage 5 — Database documentation 🔄

## License

This project was created as part of a backend development assignment.
