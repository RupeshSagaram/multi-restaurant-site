import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MenuList from './MenuList';

describe('MenuList component', () => {
  const mockMenu = [
    { name: 'Pizza', description: 'Cheese pizza', price: 10 },
    { name: 'Burger', description: 'Beef burger', price: 8 },
    { name: 'Salad', description: 'Fresh salad', price: 6 }
  ];

  it('should render all menu items', () => {
    render(<MenuList menu={mockMenu} />);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Burger')).toBeInTheDocument();
    expect(screen.getByText('Salad')).toBeInTheDocument();
  });

  it('should display message when menu is empty', () => {
    render(<MenuList menu={[]} />);
    expect(screen.getByText('No menu items yet.')).toBeInTheDocument();
  });

  it('should render correct number of items', () => {
    const { container } = render(<MenuList menu={mockMenu} />);
    const menuItems = container.querySelectorAll('.menu-item');
    expect(menuItems.length).toBe(3);
  });

  it('should render item descriptions', () => {
    render(<MenuList menu={mockMenu} />);
    expect(screen.getByText('Cheese pizza')).toBeInTheDocument();
    expect(screen.getByText('Beef burger')).toBeInTheDocument();
    expect(screen.getByText('Fresh salad')).toBeInTheDocument();
  });

  it('should render item prices', () => {
    render(<MenuList menu={mockMenu} />);
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText('$8')).toBeInTheDocument();
    expect(screen.getByText('$6')).toBeInTheDocument();
  });

  it('should handle single item menu', () => {
    const singleItem = [{ name: 'Single Item', description: 'Only item', price: 15 }];
    render(<MenuList menu={singleItem} />);
    expect(screen.getByText('Single Item')).toBeInTheDocument();
  });

  it('should not show empty message when menu has items', () => {
    render(<MenuList menu={mockMenu} />);
    expect(screen.queryByText('No menu items yet.')).not.toBeInTheDocument();
  });

  it('should handle menu with different number of items', () => {
    const { rerender, container } = render(<MenuList menu={mockMenu} />);
    expect(container.querySelectorAll('.menu-item').length).toBe(3);
    
    const shorterMenu = mockMenu.slice(0, 1);
    rerender(<MenuList menu={shorterMenu} />);
    expect(container.querySelectorAll('.menu-item').length).toBe(1);
  });
});
