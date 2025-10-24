import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button component', () => {
  it('should render with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render as a button element', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should pass through additional props', () => {
    render(<Button type="submit" disabled>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });

  it('should apply inline styles', () => {
    render(<Button>Styled</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      padding: '8px 16px',
      margin: '4px'
    });
  });

  it('should handle multiple clicks', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Multi Click</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    await user.click(button);
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it('should render different children content', () => {
    const { rerender } = render(<Button>First</Button>);
    expect(screen.getByText('First')).toBeInTheDocument();
    
    rerender(<Button>Second</Button>);
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.queryByText('First')).not.toBeInTheDocument();
  });
});
