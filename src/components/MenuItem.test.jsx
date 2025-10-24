import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MenuItem from './MenuItem';

describe('MenuItem component', () => {
  const mockItem = {
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni pizza',
    price: 12
  };

  it('should render menu item name', () => {
    render(<MenuItem item={mockItem} />);
    expect(screen.getByText('Pepperoni Pizza')).toBeInTheDocument();
  });

  it('should render menu item description', () => {
    render(<MenuItem item={mockItem} />);
    expect(screen.getByText('Classic pepperoni pizza')).toBeInTheDocument();
  });

  it('should render menu item price with dollar sign', () => {
    render(<MenuItem item={mockItem} />);
    expect(screen.getByText('$12')).toBeInTheDocument();
  });

  it('should render with correct structure', () => {
    const { container } = render(<MenuItem item={mockItem} />);
    const menuItemDiv = container.querySelector('.menu-item');
    expect(menuItemDiv).toBeInTheDocument();
  });

  it('should render heading for item name', () => {
    render(<MenuItem item={mockItem} />);
    const heading = screen.getByRole('heading', { level: 4 });
    expect(heading).toHaveTextContent('Pepperoni Pizza');
  });

  it('should handle different price values', () => {
    const item = { ...mockItem, price: 25.99 };
    render(<MenuItem item={item} />);
    expect(screen.getByText('$25.99')).toBeInTheDocument();
  });

  it('should handle empty description', () => {
    const item = { ...mockItem, description: '' };
    render(<MenuItem item={item} />);
    expect(screen.getByText('Pepperoni Pizza')).toBeInTheDocument();
    expect(screen.getByText('$12')).toBeInTheDocument();
  });

  it('should render multiple menu items independently', () => {
    const item1 = { name: 'Pizza', description: 'Cheese pizza', price: 10 };
    const item2 = { name: 'Burger', description: 'Beef burger', price: 8 };
    
    const { rerender } = render(<MenuItem item={item1} />);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    
    rerender(<MenuItem item={item2} />);
    expect(screen.getByText('Burger')).toBeInTheDocument();
    expect(screen.queryByText('Pizza')).not.toBeInTheDocument();
  });
});
