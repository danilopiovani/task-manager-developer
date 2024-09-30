import express, { Request, Response } from 'express';
// import cors from 'cors';
import cors from './middleware/cors';
import { Task } from './models/Task';
import { v4 as uuidv4 } from 'uuid';

const app = express();

// Use CORS
app.use(cors);

app.use(express.json());

// let tasks: Task[] = [];  
let tasks: Task[] = [
    {
      id: '1',
      title: 'Grocery Shopping',
      description: 'Buy ingredients for dinner: chicken, broccoli, olive oil, and pasta.',
      completed: false
    },
    {
      id: '2',
      title: 'Team Meeting Preparation',
      description: 'Prepare slides for the quarterly review, including project status and next steps.',
      completed: false
    },
    {
      id: '3',
      title: 'Client Follow-up',
      description: 'Email client with project update and confirm next meeting date.',
      completed: true
    },
    {
      id: '4',
      title: 'Doctor Appointment',
      description: 'Schedule annual check-up with Dr. Johnson and request bloodwork report.',
      completed: false
    },
    {
      id: '5',
      title: 'Car Maintenance',
      description: 'Take the car to the mechanic for an oil change and tire rotation.',
      completed: true
    },
    {
      id: '6',
      title: 'Finalize Budget Proposal',
      description: 'Complete the final version of the 2024 budget and submit for approval.',
      completed: false
    },
    {
      id: '7',
      title: 'Clean Garage',
      description: 'Organize tools, sweep the floor, and dispose of old paint cans.',
      completed: false
    },
    {
      id: '8',
      title: 'Plan Weekend Getaway',
      description: 'Book a hotel for the trip, research nearby hiking trails, and pack essentials.',
      completed: false
    },
    {
      id: '9',
      title: 'Write Blog Post',
      description: 'Draft a blog post on productivity tips for remote workers and review for edits.',
      completed: true
    },
    {
      id: '10',
      title: 'Submit Expense Report',
      description: 'Collect receipts and submit the expense report for the last business trip.',
      completed: false
    }
  ];
  

app.get('/', (req: Request, res: Response) => {
    res.send('Task Manager API');
});

// GET /task - Retrieve a list of all tasks
app.get('/tasks', (req: Request, res: Response) => {
    res.json(tasks);
});

// GET /task/:id - Retrieve a single task
app.get('/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id === id);
    if(!task) {
        res.status(404).send('Task not found');
    }
    res.json(task);
});

// POST /task - Create a new task
app.post('/tasks', (req: Request, res: Response) => {
    const { title, description } = req.body;

    // validate minimum required parameters
    if(!title || !description) {
        res.status(400).send('Title and description are required');
    }
    const newTask = {
        id: uuidv4(),
        title,
        description,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /task/:id - Update a task
app.put('/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // validate minimum required parameters
    if (!title || !description) {
        res.status(400).send('Title and description are required');
    }

    // find the task by id
    const task = tasks.find(task => task.id === id);

    

    if(!task) {
        res.status(404).send('Task not found');
    } else {
        task.title = title;
        task.description = description;
        task.completed = completed;
        res.json(task);
    }
});

// DELETE /task/:id - Delete a task
app.delete('/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    } else {
        console.error(`Task with ID: ${id} not found`);
        res.status(404).send('Task not found');
    }
});


const PORT = process.env.PORT || 3002;
if(process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;