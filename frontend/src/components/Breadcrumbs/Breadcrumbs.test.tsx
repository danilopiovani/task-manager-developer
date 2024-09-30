import { render, screen } from '@testing-library/react';
import { BrowserRouter,  MemoryRouter, Route, Routes } from 'react-router-dom';
import { Breadcrumbs, TaskList } from '../../components';
import { TaskType } from '../../types/components';
import userEvent from '@testing-library/user-event';

describe('Breadcrumbs', () => {
  test('should render the breadcrumbs with home only', () => {
    render(
      <BrowserRouter>
        <Breadcrumbs />
      </BrowserRouter>
    );

    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
    expect(screen.queryByText(/task/i)).toBeNull();
  });

  test('should render the breadcrumbs with task title', () => {
    const task: TaskType = {
      id: '1',
      title: 'Test Task',
      description: 'Test task description',
      completed: false,
    };

    render(
      <BrowserRouter>
        <Breadcrumbs task={task} />
      </BrowserRouter>
    );

    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
    
    const taskTitle = screen.getByText(/Task - Test Task/i);
    expect(taskTitle).toBeInTheDocument();
  });

  test('should click on home link and navigate to home page', async () => {
    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <Routes>
          <Route path="/tasks" element={<Breadcrumbs />} />
          <Route path="/" element={<TaskList />} />
        </Routes>
      </MemoryRouter>
    );
  
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
    
    // Simulate clicking the home link
    userEvent.click(homeLink);
    
    expect(await screen.findByText(/task list/i)).toBeInTheDocument();
  });
});
