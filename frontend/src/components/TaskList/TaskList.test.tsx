import { render, screen} from '@testing-library/react';
import App from '../../App';

describe('TaskList', () => {
  test('renders tasks in the TaskList', () => {
    render(<App />);
    const linkElement = screen.getByText(/TASK LIST/i);
    expect(linkElement).toBeInTheDocument();
  });
})
