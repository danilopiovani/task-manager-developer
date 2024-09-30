import { create } from 'zustand'
import { TaskType } from '../types/components';

interface TaskStore {
    tasks: TaskType[];
    loadTasks: (tasks: TaskType[]) => void;
    addTask: (task: TaskType) => void;
    updateTask: (taskId: string, updatedTask: Partial<TaskType>) => void;
    deleteTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskStore>((set: (partial: Partial<TaskStore> | ((state: TaskStore) => Partial<TaskStore>)) => void) => ({
    // tasks: [
    //   {
    //     id: '1',
    //     title: 'Task 1',
    //     description: 'Description 1',
    //     completed: false
    //   },
    //   {
    //     id: '2',
    //     title: 'Task 2',
    //     description: 'Description 2',
    //     completed: false
    //   },
    //   {
    //     id: '3',
    //     title: 'Task 3',
    //     description: 'Description 3',
    //     completed: false
    //   },
    //   {
    //     id: '4',
    //     title: 'Task 4',
    //     description: 'Description 4',
    //     completed: false
    //   },
    //   {
    //     id: '5',
    //     title: 'Task 5',
    //     description: 'Description 5',
    //     completed: false
    //   },
    //   {
    //     id: '6',
    //     title: 'Task 6',
    //     description: 'Description 6',
    //     completed: false
    //   },
    //   {
    //     id: '7',
    //     title: 'Task 7',
    //     description: 'Description 7',
    //     completed: false
    //   },
    //   {
    //     id: '8',
    //     title: 'Task 8',
    //     description: 'Description 8',
    //     completed: false
    //   },
    //   {
    //     id: '9',
    //     title: 'Task 9',
    //     description: 'Description 9',
    //     completed: false
    //   },
    //   {
    //     id: '10',
    //     title: 'Task 10',
    //     description: 'Description 10',
    //     completed: false
    //   }
    // ],
    tasks: [],
    loadTasks: (tasks: TaskType[]) => set((state) => ({ tasks: tasks })),
    addTask: (task: TaskType) => set((state) => ({ tasks: [...state.tasks, task] })),
    updateTask: (taskId: string, updatedTask: Partial<TaskType>) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
            ),
        })),
    deleteTask: (taskId: string) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
}));