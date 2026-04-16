// app.js
// Module 3 - Task Manager with SQLite (Final Clean Version)
// Author: Ijato Precious-jane Okpen

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Set EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));

/**
 * Connect to SQLite database
 */
const db = new sqlite3.Database('tasks.db', (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

/**
 * Create table if it doesn't exist
 */
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        dueDate TEXT
    )
`);

/**
 * Recursion: count completed tasks
 */
function countCompleted(tasksArray, index = 0) {
    if (index >= tasksArray.length) return 0;

    return (tasksArray[index].completed === 1 ? 1 : 0) +
        countCompleted(tasksArray, index + 1);
}

/**
 * HOME ROUTE - Display tasks
 */
app.get('/', (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            console.error("Fetch error:", err.message);
            rows = [];
        }

        const totalTasks = rows.length;

        // ES6 filter
        const completedTasks = rows.filter(task => task.completed === 1).length;

        // Recursion
        const completedByRecursion = countCompleted(rows);

        res.render('index', {
            tasks: rows,
            totalTasks,
            completedTasks,
            completedByRecursion
        });
    });
});

/**
 * ADD TASK
 */
app.post('/add', (req, res) => {
    try {
        const { task, dueDate } = req.body;

        if (!task) {
            throw new Error("Task is required");
        }

        const finalDate = dueDate && dueDate.trim() !== "" ? dueDate : "No date";

        db.run(
            "INSERT INTO tasks (description, completed, dueDate) VALUES (?, 0, ?)",
            [task, finalDate],
            (err) => {
                if (err) console.error("Insert error:", err.message);
                res.redirect('/');
            }
        );
    } catch (error) {
        console.error("Add error:", error.message);
        res.redirect('/');
    }
});

/**
 * DELETE TASK
 */
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM tasks WHERE id = ?", [id], (err) => {
        if (err) console.error("Delete error:", err.message);
        res.redirect('/');
    });
});

/**
 * COMPLETE TASK
 */
app.get('/complete/:id', (req, res) => {
    const id = req.params.id;

    db.run(
        "UPDATE tasks SET completed = 1 WHERE id = ?",
        [id],
        (err) => {
            if (err) console.error("Complete error:", err.message);
            res.redirect('/');
        }
    );
});

/**
 * EDIT TASK
 */
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { task, dueDate } = req.body;

    const finalDate = dueDate && dueDate.trim() !== "" ? dueDate : "No date";

    db.run(
        "UPDATE tasks SET description = ?, dueDate = ? WHERE id = ?",
        [task, finalDate, id],
        (err) => {
            if (err) console.error("Edit error:", err.message);
            res.redirect('/');
        }
    );
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});