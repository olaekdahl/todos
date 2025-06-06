import { render, screen, fireEvent } from '@testing-library/react';
import { CreateTodo } from './CreateTodo';

describe('CreateTodo', () => {
  const mockSendNewTodo = jest.fn();
  
  beforeEach(() => {
    mockSendNewTodo.mockClear();
  });

  test('renders form with all input fields', () => {
    render(<CreateTodo sendNewTodo={mockSendNewTodo} />);
    
    expect(screen.getByLabelText(/What do you need to do?/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Priority/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create to do/ })).toBeInTheDocument();
  });

  test('updates description input value', () => {
    render(<CreateTodo sendNewTodo={mockSendNewTodo} />);
    
    const descriptionInput = screen.getByLabelText(/What do you need to do?/);
    fireEvent.change(descriptionInput, { target: { value: 'New task' } });
    
    expect(descriptionInput.value).toBe('New task');
  });

  test('updates priority input value', () => {
    render(<CreateTodo sendNewTodo={mockSendNewTodo} />);
    
    const priorityInput = screen.getByLabelText(/Priority/);
    fireEvent.change(priorityInput, { target: { value: '3' } });
    
    expect(priorityInput.value).toBe('3');
  });

  test('calls sendNewTodo with correct values when form is submitted', () => {
    render(<CreateTodo sendNewTodo={mockSendNewTodo} />);
    
    const descriptionInput = screen.getByLabelText(/What do you need to do?/);
    const priorityInput = screen.getByLabelText(/Priority/);
    const submitButton = screen.getByRole('button', { name: /Create to do/ });
    
    fireEvent.change(descriptionInput, { target: { value: 'Test task' } });
    fireEvent.change(priorityInput, { target: { value: '4' } });
    fireEvent.click(submitButton);
    
    expect(mockSendNewTodo).toHaveBeenCalledTimes(1);
    expect(mockSendNewTodo).toHaveBeenCalledWith(
      'Test task',
      '4',
      expect.any(Object) // the event object
    );
  });

  test('has correct default values', () => {
    render(<CreateTodo sendNewTodo={mockSendNewTodo} />);
    
    const descriptionInput = screen.getByLabelText(/What do you need to do?/);
    const priorityInput = screen.getByLabelText(/Priority/);
    
    expect(descriptionInput.value).toBe('');
    expect(priorityInput.value).toBe('1');
  });
});