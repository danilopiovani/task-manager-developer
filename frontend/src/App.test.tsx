import { render, screen } from '@testing-library/react';
import App from './App'; 

test('render main page', () => {
  render(<App />);
  const linkElement = screen.getByText(/TASK LIST/i);
  expect(linkElement).toBeInTheDocument();
});
