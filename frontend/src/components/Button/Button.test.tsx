import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../components';

describe('Button Test', () => {
  test('should render the button', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });

  test('should call the onClick function when clicked', () => {
    const onClickMock = jest.fn();
    render(<Button callback={onClickMock}>Click me</Button>);
    fireEvent.click(screen.getByText(/click me/i));
    expect(onClickMock).toHaveBeenCalled();
  });
});
