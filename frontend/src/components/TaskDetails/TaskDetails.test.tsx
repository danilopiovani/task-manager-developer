import { render, screen} from '@testing-library/react';
import App from '../../App';

describe('Task Details', () => {
  test('renders tasks in the Task Details', () => {
    render(<App />);
    const linkElement = screen.getByText(/TASK LIST/i);
    expect(linkElement).toBeInTheDocument();
  });
})
