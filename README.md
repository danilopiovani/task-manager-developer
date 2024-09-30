
# Task List To-Do Application

This is a full-stack Task List To-Do application built with TypeScript, demonstrating the implementation of CRUD operations on both the backend and frontend. The app includes a RESTful API for managing tasks and a React frontend for displaying and interacting with tasks.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

### Backend
- **RESTful API**: 
  - `GET /tasks`: Retrieve all tasks.
  - `GET /tasks/:id`: Retrieve a task by its ID.
  - `POST /tasks`: Create a new task.
  - `PUT /tasks/:id`: Update a task's title and description.
  - `DELETE /tasks/:id`: Delete a task.
- **In-memory data storage**: Temporary task storage.
- **Error Handling**: Returns appropriate HTTP status codes for errors (400, 404).
- **CORS Support**: Enables frontend-backend communication.

### Frontend
- **Task List**: Displays a list of tasks with options to edit or delete.
- **Task Form**: Allows creation and editing of tasks.
- **State Management**: Manages task state using React state or Zustand.

---

## Prerequisites

- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **Git**: For cloning the repository

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/danilopiovani/task-manager-developer.git
   cd task-manager-backend
   ```

---

## Setup

1. Install dependencies:
   ```bash
   npm run install-all
   ```
 
2. Start the project:
   ```bash
   npm run start
   ```

By default: 
The server will be running on `http://localhost:3002`.
The frontend will be running on `http://localhost:3000`.

---


## Running the Application

Once both backend and frontend are set up, the full application will be accessible via `http://localhost:3000`. The frontend communicates with the backend to perform CRUD operations on tasks.

---

## API Endpoints

1. **GET /tasks**: Retrieve all tasks.
   ```bash
   curl http://localhost:3002/tasks
   ```

2. **GET /tasks/:id**: Retrieve a specific task by ID. (Should get error as task 1 do not exist)
   ```bash
   curl http://localhost:3002/tasks/1
   ```

3. **POST /tasks**: Create a new task.
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"title": "New Task", "description": "This is a new task"}' http://localhost:3002/tasks
   ```

4. **PUT /tasks/:id**: Update a task's title and description.
   ```bash
   curl -X PUT -H "Content-Type: application/json" -d '{"title": "Updated Task", "description": "This is an updated task", completed: false}' http://localhost:3002/tasks/1
   ```
5. **GET /tasks/:id**: Retrieve a specific task by ID. (Should return the required task)
   ```bash
   curl http://localhost:3002/tasks/1
   ```
5. **DELETE /tasks/:id**: Delete a task by ID.
   ```bash
   curl -X DELETE http://localhost:3002/tasks/1
   ```

---

## Technologies Used

- **Backend**:
  - Node.js
  - Express
  - TypeScript
- **Frontend**:
  - React
  - TypeScript
  - Zustand (for state management)
- **Development Tools**:
  - Jest (for testing)
  - Supertest (for API testing)

---

## License

This project is licensed under the MIT License.
