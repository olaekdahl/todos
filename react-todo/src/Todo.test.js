import { render, screen, fireEvent } from '@testing-library/react';
import { Todo } from './Todo';

describe('Todo', () => {
  const mockToggleTodo = jest.fn();
  
  beforeEach(() => {
    mockToggleTodo.mockClear();
  });

  test('renders todo with description and priority', () => {
    const todo = {
      id: 1,
      description: 'Test todo',
      priority: 2,
      complete: false
    };

    render(<Todo todo={todo} toggleTodo={mockToggleTodo} />);
    
    expect(screen.getByText(/Test todo/)).toBeInTheDocument();
    expect(screen.getByText(/priority: 2/)).toBeInTheDocument();
  });

  test('renders completed todo with different styling', () => {
    const completedTodo = {
      id: 2,
      description: 'Completed todo',
      priority: 1,
      complete: true
    };

    const { container } = render(<Todo todo={completedTodo} toggleTodo={mockToggleTodo} />);
    
    const todoElement = container.querySelector('ul');
    expect(todoElement).toHaveStyle('opacity: 0.25');
    expect(todoElement).toHaveStyle('text-decoration: line-through');
  });

  test('calls toggleTodo when clicked', () => {
    const todo = {
      id: 3,
      description: 'Clickable todo',
      priority: 3,
      complete: false
    };

    const { container } = render(<Todo todo={todo} toggleTodo={mockToggleTodo} />);
    
    const todoElement = container.querySelector('ul');
    fireEvent.click(todoElement);
    
    expect(mockToggleTodo).toHaveBeenCalledTimes(1);
    expect(mockToggleTodo).toHaveBeenCalledWith(todo);
  });
});