import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../TaskForm'; // Adjust the import path
import { useTaskStore } from '../../stores/useTaskStore';
import { useFetch } from '../../hooks/useFetch';

jest.mock('../../stores/useTaskStore');
jest.mock('../../hooks/useFetch');

describe('TaskForm', () => {
  let addTaskMock = jest.fn();
  let mutateDataMock = jest.fn();
  const mockUseTaskStore = useTaskStore as jest.MockedFunction<typeof useTaskStore>;


  beforeEach(() => {
    mockUseTaskStore.mockReturnValue({
      addTask: addTaskMock,
      updateTask: jest.fn(),
      tasks: [],
    });

    (useFetch as jest.Mock).mockReturnValue({
      mutateData: mutateDataMock,
      data: null,
      error: null,
    });
  });

  // ADD - test if field exists
  test('should render the form fields - ADD', () => {
    render(<TaskForm action="add" />);
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });

  // UPDATE - test if field exists
  test('should render the form fields - UPDATE', () => {
    render(<TaskForm action="update" callback={() => console.log('test')} />);
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
    expect(screen.getByText(/close/i)).toBeInTheDocument();
  });

  test('should call mutateData with correct arguments when ADDING a new task', () => {
    render(<TaskForm action="add" />);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: 'New Task' },
    });
    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: 'New task description' },
    });

    // Simulate button click
    fireEvent.click(screen.getByText(/add/i));

    // Assert that mutateData was called with the correct arguments
    expect(mutateDataMock).toHaveBeenCalledWith('/tasks', {
      title: 'New Task',
      description: 'New task description',
      completed: false,
    }, 'POST');
  });

  test('should call mutateData with correct arguments when UPDATING a task', () => {

    const taskMock = { id: '1', title: 'Task', description: 'Task description', completed: false };
    // mock a task
    mockUseTaskStore.mockReturnValue({
      tasks: [taskMock],
      addTask: jest.fn(),
      updateTask: jest.fn
    });

    render(<TaskForm action="update" task={taskMock}/>);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: 'Modified Task' },
    });
    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: 'Modified task description' },
    });

    // Simulate button click - update
    fireEvent.click(screen.getByText(/update/i));

    // Assert that mutateData was called with the correct arguments
    expect(mutateDataMock).toHaveBeenCalledWith('/tasks/1', {
      title: 'Modified Task',
      description: 'Modified task description',
      completed: false,
    }, 'PUT');
  });

  test('shows error when title is empty', () => {
    render(<TaskForm action="add" />);
    
    const submitButton = screen.getByText(/ADD/i);
    fireEvent.click(submitButton);
    
    expect(screen.getByPlaceholderText(/Title is required/i)).toBeInTheDocument();
  });

  test('shows error when description is empty', () => {
    render(<TaskForm action="add" />);
    
    const submitButton = screen.getByText(/ADD/i);
    fireEvent.click(submitButton);
    
    expect(screen.getByPlaceholderText(/Description is required/i)).toBeInTheDocument();
  });

  test('shows error when title and description are empty', () => {
    render(<TaskForm action="add" />);
    
    const submitButton = screen.getByText(/ADD/i);
    fireEvent.click(submitButton);
    
    expect(screen.getByPlaceholderText(/Title is required/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description is required/i)).toBeInTheDocument();
  });

  // UPDATE
  test('shows error when title is empty', () => {
    const taskMock = { id: '1', title: '', description: 'Task description', completed: false };
    // mock a task
    mockUseTaskStore.mockReturnValue({
      tasks: [taskMock],
      addTask: jest.fn(),
      updateTask: jest.fn
    });

    render(<TaskForm action="update" task={taskMock}/>);

    const submitButton = screen.getByText(/UPDATE/i);
    fireEvent.click(submitButton);
    
    expect(screen.getByPlaceholderText(/Title is required/i)).toBeInTheDocument();
  });

  test('shows error when description is empty', () => {
    const taskMock = { id: '1', title: 'Task', description: '', completed: false };
    // mock a task
    mockUseTaskStore.mockReturnValue({
      tasks: [taskMock],
      addTask: jest.fn(),
      updateTask: jest.fn
    });

    render(<TaskForm action="update" task={taskMock}/>);

    const submitButton = screen.getByText(/UPDATE/i);
    fireEvent.click(submitButton);
    
    expect(screen.getByPlaceholderText(/Description is required/i)).toBeInTheDocument();
  });

  test('shows error when title and description are empty', () => {
    const taskMock = { id: '1', title: '', description: '', completed: false };
    // mock a task
    mockUseTaskStore.mockReturnValue({
      tasks: [taskMock],
      addTask: jest.fn(),
      updateTask: jest.fn
    });

    render(<TaskForm action="update" task={taskMock}/>);

    const submitButton = screen.getByText(/UPDATE/i);
    fireEvent.click(submitButton);
    
    expect(screen.getByPlaceholderText(/Title is required/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description is required/i)).toBeInTheDocument();
  });
});
