import { render, screen } from '@testing-library/react';
import { Footer } from '../../components';

describe('Footer Test', () => {
  test('should render the footer', () => {
    render(<Footer />);
    expect(screen.getByText(/Danilo Piovani/i)).toBeInTheDocument();
  });
});
