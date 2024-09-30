import { render, screen } from '@testing-library/react';
import iconSizes from '../../constants/iconSizes'; // Ensure this points to the correct file
import { Bin, Close, Error, Home, ListIcon, Pencil, Plus } from '../icons'; // Adjust the import path as necessary

const icons = [
  { Component: Close, name: 'Close' },
  { Component: Bin, name: 'Bin' },
  { Component: Error, name: 'Error' },
  { Component: Home, name: 'Home' },
  { Component: ListIcon, name: 'ListIcon' },
  { Component: Pencil, name: 'Pencil' },
  { Component: Plus, name: 'Plus' },
];

describe('Icon Components', () => {
  icons.forEach(({ Component, name }) => {
    test(`${name} renders without crashing`, () => {
      render(<Component />); 
      const icon = screen.getByRole('img');
      expect(icon).toBeInTheDocument(); 
    });

    test(`${name} renders with default size`, () => {
      render(<Component />);
      const icon = screen.getByRole('img');
      expect(icon).toHaveAttribute('width', iconSizes.md.toString());
      expect(icon).toHaveAttribute('height', iconSizes.md.toString());
    });

    test(`${name} renders with specified size`, () => {
      const size = 'lg';
      render(<Component size={size} />);
      const icon = screen.getByRole('img');
      expect(icon).toHaveAttribute('width', iconSizes[size].toString());
      expect(icon).toHaveAttribute('height', iconSizes[size].toString());
    });
  });
});
