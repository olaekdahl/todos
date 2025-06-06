import { render, screen } from '@testing-library/react';
import { Home, AboutUs, ContactUs } from './OtherComponent';

describe('OtherComponent', () => {
  test('Home component renders correctly', () => {
    render(<Home />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('AboutUs component renders correctly', () => {
    render(<AboutUs />);
    expect(screen.getByText('About us')).toBeInTheDocument();
  });

  test('ContactUs component renders correctly', () => {
    render(<ContactUs />);
    expect(screen.getByText('Contact us')).toBeInTheDocument();
  });
});