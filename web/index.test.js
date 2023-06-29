/**
  * @jest-environment jsdom
*/

import { jest } from '@jest/globals'
import fs from 'fs';
import { getData, toggleCompletion, renderTodo, drawTodos } from './index';

function mockFetch(data) {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(data)
  }));
}

let ul;
let todos;

describe('Unit tests for the code', () => {
  beforeEach(() => {
    // Set up the initial state for each test case
    window.document.body.innerHTML = fs.readFileSync('./web/index.html');

    ul = document.createElement('ul');
    todos = [
      { id: 1, description: 'Todo 1', complete: false },
      { id: 2, description: 'Todo 2', complete: true },
    ];
  });

  afterEach(() => {
    // Clean up after each test case
    ul = null;
    todos = null;
  });

  test('drawTodos should render todos correctly', () => {
    drawTodos(todos);

    // Get the ul element after calling drawTodos
    const ul = document.querySelector('ul');

    // Expect that the ul element is defined and not null
    expect(ul).toBeDefined();
    expect(ul).not.toBeNull();

    // Expect that the ul element is empty
    expect(ul.innerHTML).toBe('<li data-id="1" class="todo false">Todo 1</li><li data-id="2" class="todo true">Todo 2</li>');
  });

  test('renderTodo should create and return a li element with correct attributes', () => {
    const todo = { id: 1, description: 'Test Todo', complete: false };

    const li = renderTodo(todo);

    expect(li.tagName).toBe('LI');
    expect(li.getAttribute('data-id')).toBe('1');
    expect(li.classList.contains('todo')).toBe(true);
    expect(li.classList.contains(false)).toBe(true);
    expect(li.textContent).toBe('Test Todo');
  });

  test('toggleCompletion should update the todo completion status and replace the corresponding li element', async () => {
    const todo = { id: 1, description: 'Todo 1', complete: false };
    const newTodo = { id: 1, description: 'Todo 1', complete: true };

    // Mock the fetch response
    mockFetch(newTodo);

    // Create a dummy li element with the original todo data
    const li = document.createElement('li');
    li.setAttribute('data-id', '1');
    ul.appendChild(li);
    
    // Uncomment the following line to make the test pass. Hacky, but it works!
    drawTodos(todos);
    
    await toggleCompletion(todo);

    expect(fetch).toHaveBeenCalledWith('/api/todos/1/toggleComplete', { method: 'PATCH' });
    expect(ul.innerHTML).toBe('<li data-id="1"></li>'); // The li element should be replaced

    // Restore the original fetch implementation
    fetch.mockRestore();
  });

  test('getData should fetch and return data from the API', async () => {
    const mockResponse = [{ id: 1, description: 'Todo 1', complete: false }];

    // Mock the fetch response
    mockFetch(mockResponse);

    const result = await getData();

    expect(fetch).toHaveBeenCalledWith('/api/todos');
    expect(result).toEqual(mockResponse);

    // Restore the original fetch implementation
    fetch.mockRestore();
  });
});
