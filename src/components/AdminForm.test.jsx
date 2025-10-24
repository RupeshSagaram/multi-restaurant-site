import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminForm from './AdminForm';

describe('AdminForm component', () => {
  it('should render all input fields', () => {
    render(<AdminForm onAddMenuItem={vi.fn()} />);
    expect(screen.getByPlaceholderText('Item Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Price')).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(<AdminForm onAddMenuItem={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Add Item' })).toBeInTheDocument();
  });

  it('should allow typing in name field', async () => {
    const user = userEvent.setup();
    render(<AdminForm onAddMenuItem={vi.fn()} />);
    
    const nameInput = screen.getByPlaceholderText('Item Name');
    await user.type(nameInput, 'Pizza');
    
    expect(nameInput).toHaveValue('Pizza');
  });

  it('should allow typing in description field', async () => {
    const user = userEvent.setup();
    render(<AdminForm onAddMenuItem={vi.fn()} />);
    
    const descInput = screen.getByPlaceholderText('Description');
    await user.type(descInput, 'Delicious pizza');
    
    expect(descInput).toHaveValue('Delicious pizza');
  });

  it('should allow typing in price field', async () => {
    const user = userEvent.setup();
    render(<AdminForm onAddMenuItem={vi.fn()} />);
    
    const priceInput = screen.getByPlaceholderText('Price');
    await user.type(priceInput, '12');
    
    expect(priceInput).toHaveValue(12);
  });

  it('should call onAddMenuItem with correct data when form is submitted', async () => {
    const user = userEvent.setup();
    const mockAddMenuItem = vi.fn();
    render(<AdminForm onAddMenuItem={mockAddMenuItem} />);
    
    await user.type(screen.getByPlaceholderText('Item Name'), 'Test Item');
    await user.type(screen.getByPlaceholderText('Description'), 'Test Description');
    await user.type(screen.getByPlaceholderText('Price'), '15');
    await user.click(screen.getByRole('button', { name: 'Add Item' }));
    
    expect(mockAddMenuItem).toHaveBeenCalledWith({
      name: 'Test Item',
      description: 'Test Description',
      price: '15'
    });
  });

  it('should clear form fields after submission', async () => {
    const user = userEvent.setup();
    render(<AdminForm onAddMenuItem={vi.fn()} />);
    
    const nameInput = screen.getByPlaceholderText('Item Name');
    const descInput = screen.getByPlaceholderText('Description');
    const priceInput = screen.getByPlaceholderText('Price');
    
    await user.type(nameInput, 'Test Item');
    await user.type(descInput, 'Test Description');
    await user.type(priceInput, '15');
    await user.click(screen.getByRole('button', { name: 'Add Item' }));
    
    expect(nameInput).toHaveValue('');
    expect(descInput).toHaveValue('');
    expect(priceInput).toHaveValue(null);
  });

  it('should not submit if name is missing', async () => {
    const user = userEvent.setup();
    const mockAddMenuItem = vi.fn();
    render(<AdminForm onAddMenuItem={mockAddMenuItem} />);
    
    await user.type(screen.getByPlaceholderText('Description'), 'Test Description');
    await user.type(screen.getByPlaceholderText('Price'), '15');
    await user.click(screen.getByRole('button', { name: 'Add Item' }));
    
    expect(mockAddMenuItem).not.toHaveBeenCalled();
  });

  it('should not submit if price is missing', async () => {
    const user = userEvent.setup();
    const mockAddMenuItem = vi.fn();
    render(<AdminForm onAddMenuItem={mockAddMenuItem} />);
    
    await user.type(screen.getByPlaceholderText('Item Name'), 'Test Item');
    await user.type(screen.getByPlaceholderText('Description'), 'Test Description');
    await user.click(screen.getByRole('button', { name: 'Add Item' }));
    
    expect(mockAddMenuItem).not.toHaveBeenCalled();
  });

  it('should allow submission without description', async () => {
    const user = userEvent.setup();
    const mockAddMenuItem = vi.fn();
    render(<AdminForm onAddMenuItem={mockAddMenuItem} />);
    
    await user.type(screen.getByPlaceholderText('Item Name'), 'Test Item');
    await user.type(screen.getByPlaceholderText('Price'), '15');
    await user.click(screen.getByRole('button', { name: 'Add Item' }));
    
    expect(mockAddMenuItem).toHaveBeenCalledWith({
      name: 'Test Item',
      description: '',
      price: '15'
    });
  });

  it('should have number type for price input', () => {
    render(<AdminForm onAddMenuItem={vi.fn()} />);
    const priceInput = screen.getByPlaceholderText('Price');
    expect(priceInput).toHaveAttribute('type', 'number');
  });
});
