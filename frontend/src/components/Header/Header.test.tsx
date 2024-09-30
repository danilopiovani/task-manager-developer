import { render, screen } from '@testing-library/react';
import { Header } from '../../components';

describe('Header Test', () => {
  test('should render the header', () => {
    render(<Header />);
    expect(screen.getByText(/Developer Assessment/i)).toBeInTheDocument();
  });
});