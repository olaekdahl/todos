import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the fetch function for TodoList component
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([])
  })
);

// Helper function to render App with Router
const renderApp = () => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe('App', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders navigation menu', () => {
    renderApp();
    
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Todos' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About us' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  test('renders navigation links with correct href attributes', () => {
    renderApp();
    
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Todos' })).toHaveAttribute('href', '/todos');
    expect(screen.getByRole('link', { name: 'About us' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  test('renders Home component by default', () => {
    renderApp();
    
    // Since we're at the root path, it should render the Home component
    expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeInTheDocument();
  });

  test('has proper HTML structure', () => {
    const { container } = renderApp();
    
    expect(container.querySelector('header nav')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
});