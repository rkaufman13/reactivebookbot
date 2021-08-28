import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a button that says time machine on it', () => {
  render(<App />);
  const linkElement = screen.getByText(/time machine/i);
  expect(linkElement).toBeInTheDocument();
});

