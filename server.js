const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./openapi.json");
const Database = require("better-sqlite3");
const db = new Database("tasks.db");
db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        done INTEGER NOT NULL DEFAULT 0
    )
`);
const taskCount = db.prepare("SELECT COUNT(*) AS count FROM tasks").get();

if (taskCount.count === 0) {
    const insert = db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)");

    insert.run("Learn Node.js", 0);
    insert.run("Build Task API", 0);
    insert.run("Test API", 1);
}
const app = express();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
app.use(express.json());

const tasks = [
    {
        id: 1,
        title: "Learn Node.js",
        done: false
    },
    {
        id: 2,
        title: "Build Task API",
        done: false
    },
    {
        id: 3,
        title: "Test API",
        done: true
    }
];

app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(task);
});

app.get("/tasks", (req, res) => {
    const tasks = db.prepare("SELECT * FROM tasks").all();
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }
    const result = db
        .prepare("INSERT INTO tasks (title, done) VALUES (?, ?)")
        .run(req.body.title, 0);

    const newTask = {
        id: result.lastInsertRowid,
        title: req.body.title,
        done: false
    };
    res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({
        error: `Task ${id} not found`
        });
    }
    if (!req.body.title && req.body.done === undefined) {
        return res.status(400).json({
        error: "Title or done is required"
        });
    }
    if (req.body.title !== undefined) {
        task.title = req.body.title;
    }

    if (req.body.done !== undefined) {
        task.done = req.body.done;
    }
    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send();

});

app.listen(3000, () => {
    console.log("Task API running on http://localhost:3000");
});