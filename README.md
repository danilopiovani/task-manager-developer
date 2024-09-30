
# Task List To-Do Application

This is a full-stack Task List To-Do application built with TypeScript, demonstrating the implementation of CRUD operations on both the backend and frontend. The app includes a RESTful API for managing tasks and a React frontend for displaying and interacting with tasks.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
- [Deployed and Publish Version](#deployed-and-publish-version)
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

##### By default: 
The server will be running on `http://localhost:3002`.

The frontend will be running on `http://localhost:3000`.

---


## Running the Application

Once both backend and frontend are set up, the full application will be accessible via `http://localhost:3000`. The frontend communicates with the backend to perform CRUD operations on tasks.

---


## Running tests
```bash
   npm run test
```


## API Endpoints

1. **GET /tasks**: Retrieve all tasks.
   ```bash
    curl -X GET http://localhost:3002/tasks \
    -H "Content-Type: application/json" \
    -H "Origin: http://localhost:3000"
    ```

2. **GET /tasks/:id**: Retrieve a specific task by ID. (Should get error as task 1 do not exist).
   ```bash
   curl -X GET http://localhost:3002/tasks/1 \
    -H "Content-Type: application/json" \
    -H "Origin: http://localhost:3000"
   ```

3. **POST /tasks**: Create a new task.
   ```bash
   TASK_ID=$(curl -X POST http://localhost:3002/tasks \
    -H "Content-Type: application/json" \
    -H "Origin: http://localhost:3000" \
    -d '{"title": "New Task", "description": "Task details here", "completed": false}' | jq -r '.id')

    echo "Created Task ID: $TASK_ID"
   ```

4. **PUT /tasks/:id**: Update a task's title and description.
   ```bash
   curl -X PUT http://localhost:3002/tasks/$TASK_ID \
    -H "Content-Type: application/json" \
    -H "Origin: http://localhost:3000" \
    -d '{"title": "Updated Task", "description": "This is an updated task", "completed": true}'
   ```
   
5. **GET /tasks/:id**: Retrieve a specific task by ID. (Should return the required task)
   ```bash
   curl -X GET http://localhost:3002/tasks/$TASK_ID \
    -H "Content-Type: application/json" \
    -H "Origin: http://localhost:3000"
   ```
   
5. **DELETE /tasks/:id**: Delete a task by ID.
   ```bash
   curl -X DELETE http://localhost:3002/tasks/$TASK_ID \
    -H "Content-Type: application/json" \
    -H "Origin: http://localhost:3000"
   ```
  
---

## Deployed and Published Version
The task manager application is now live and accessible at this - [link](https://task-manager-developer-frontend.onrender.com/). You can interact with the full functionality of the app without needing to install or set up any local environment.

This deployed version includes all features of the task manager, allowing you to create, update, delete, and manage tasks seamlessly. Simply visit the [link](https://task-manager-developer-frontend.onrender.com/) to start managing your tasks effortlessly!

If you prefer a local setup, the instructions are available in the previous sections. However, for those who want to quickly explore the application, feel free to dive right in!

[Live version: ](https://task-manager-developer-frontend.onrender.com/)


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
