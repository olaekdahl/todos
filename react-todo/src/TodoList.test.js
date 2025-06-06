import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TodoList } from './TodoList';

// Mock the fetch function
global.fetch = jest.fn();

describe('TodoList', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders todo list title', () => {
    fetch.mockResolvedValueOnce({
      json: async () => []
    });

    render(<TodoList />);
    
    expect(screen.getByText('Stuff I gotta do today')).toBeInTheDocument();
  });

  test('fetches and displays todos on mount', async () => {
    const mockTodos = [
      { id: 1, description: 'Test todo 1', priority: 1, complete: false },
      { id: 2, description: 'Test todo 2', priority: 2, complete: true }
    ];

    fetch.mockResolvedValueOnce({
      json: async () => mockTodos
    });

    render(<TodoList />);
    
    await waitFor(() => {
      expect(screen.getByText(/Test todo 1/)).toBeInTheDocument();
      expect(screen.getByText(/Test todo 2/)).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith('/api/todos');
  });

  test('handles empty todo list', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => []
    });

    render(<TodoList />);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/todos');
    });

    // Should render CreateTodo component and title even with empty list
    expect(screen.getByText('Stuff I gotta do today')).toBeInTheDocument();
    expect(screen.getByLabelText(/What do you need to do?/)).toBeInTheDocument();
  });

  test('toggles todo completion', async () => {
    const mockTodos = [
      { id: 1, description: 'Test todo', priority: 1, complete: false }
    ];
    const updatedTodo = { id: 1, description: 'Test todo', priority: 1, complete: true };

    // Mock initial fetch
    fetch.mockResolvedValueOnce({
      json: async () => mockTodos
    });

    // Mock toggle completion fetch
    fetch.mockResolvedValueOnce({
      json: async () => updatedTodo
    });

    const { container } = render(<TodoList />);
    
    // Wait for initial todos to load
    await waitFor(() => {
      expect(screen.getByText(/Test todo/)).toBeInTheDocument();
    });

    // Click on todo to toggle it
    const todoElement = container.querySelector('ul ul'); // The inner ul from Todo component
    fireEvent.click(todoElement);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/todos/1/toggleComplete', {
        method: 'PATCH'
      });
    });
  });

  test('adds new todo', async () => {
    // Mock initial empty fetch
    fetch.mockResolvedValueOnce({
      json: async () => []
    });

    // Mock add todo fetch
    const newTodo = { id: 1, description: 'New task', priority: 2, complete: false };
    fetch.mockResolvedValueOnce({
      json: async () => newTodo
    });

    render(<TodoList />);
    
    // Wait for initial load
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/todos');
    });

    // Fill in form
    const descriptionInput = screen.getByLabelText(/What do you need to do?/);
    const priorityInput = screen.getByLabelText(/Priority/);
    const submitButton = screen.getByRole('button', { name: /Create to do/ });
    
    fireEvent.change(descriptionInput, { target: { value: 'New task' } });
    fireEvent.change(priorityInput, { target: { value: '2' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: 'New task', priority: '2' })
      });
    });

    // Should display the new todo
    await waitFor(() => {
      expect(screen.getByText(/New task/)).toBeInTheDocument();
    });
  });
});