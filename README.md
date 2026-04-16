# Express Task Manager 3.0 (SQLite Version)

## Overview
This is an improved version of the Task Manager Web Application built using Node.js and Express.  
In this version, task data is no longer stored in a JSON file. Instead, it uses a SQLite relational database for persistent data storage.

The application allows users to create, view, update, complete, and delete tasks directly from the browser. It demonstrates full CRUD operations using SQL queries and integrates a database into a web application.

## Purpose of This Module
The purpose of this module is to demonstrate the use of SQL relational databases in a real application.  
This project builds on previous modules by replacing file-based storage with a database and performing SQL operations through application code.

## Features
- View all tasks stored in a SQL database
- Add new tasks (INSERT query)
- Edit existing tasks (UPDATE query)
- Mark tasks as completed (UPDATE query)
- Delete tasks (DELETE query)
- Store data persistently using SQLite
- Dynamic rendering in the browser using EJS
- Demonstrates recursion and ES6 array functions

## Database Structure
Table: tasks

- id (INTEGER PRIMARY KEY AUTOINCREMENT)
- description (TEXT)
- completed (INTEGER)
- dueDate (TEXT)

## SQL Functionality Demonstrated
- INSERT → Add new tasks
- SELECT → Retrieve all tasks
- UPDATE → Edit and complete tasks
- DELETE → Remove tasks

## Additional Concepts Used
- Recursion (count completed tasks)
- Error handling (try/catch)
- ES6 JavaScript features
- Express routing

## Software Demo Video
https://youtu.be/your-video-link-here

## Development Environment
- Node.js
- Express.js
- SQLite3
- EJS
- VS Code
- Browser (Chrome, Edge, Firefox)

## Useful Websites
* https://nodejs.org/en/docs/
* https://expressjs.com/
* https://www.sqlite.org/docs.html
* https://developer.mozilla.org/en-US/docs/Learn/Forms