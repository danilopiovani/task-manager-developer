import { render, screen } from '@testing-library/react';
import { Task } from '..';
import { BrowserRouter } from 'react-router-dom';

describe('Task Test', () => {
  test('should render the Task', () => {
    const taskMock = {
      id: 'bc7fffb6-09a1-4717-b259-95e6bcefc1e1',
      title: 'Test Task title',
      description: 'This is a test task description',
      completed: false,
    }
    render(
      <BrowserRouter>
        <Task task={taskMock} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Task title/i)).toBeInTheDocument();
    expect(screen.getByText(/task description/i)).toBeInTheDocument();
  });
  // checkbox test
  test('should render the Task with checkbox', () => {
    const taskMock = {
      id: 'bc7fffb6-09a1-4717-b259-95e6bcefc1e1',
      title: 'Test Task title',
      description: 'This is a test task description',
      completed: false,
    }
    render(
      <BrowserRouter>
        <Task task={taskMock} />
      </BrowserRouter>
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  // checkbox checked test
  test('should render the Task with checkbox checked', () => {
    const taskMock = {
      id: 'bc7fffb6-09a1-4717-b259-95e6bcefc1e1',
      title: 'Test Task title',
      description: 'This is a test task description',
      completed: true,
    }
    render(
      <BrowserRouter>
        <Task task={taskMock} />
      </BrowserRouter>
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

});
 