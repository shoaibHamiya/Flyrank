const express = require("express");

const app = express();

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
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(task);
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.listen(3000, () => {
    console.log("Task API running on http://localhost:3000");
});