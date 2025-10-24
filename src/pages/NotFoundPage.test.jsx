import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage component', () => {
  it('should render 404 heading', () => {
    render(<NotFoundPage />);
    expect(screen.getByRole('heading', { name: '404 - Page Not Found' })).toBeInTheDocument();
  });

  it('should render error message', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
  });

  it('should have proper heading level', () => {
    render(<NotFoundPage />);
    const heading = screen.getByRole('heading', { name: '404 - Page Not Found' });
    expect(heading.tagName).toBe('H2');
  });

  it('should render in a div container', () => {
    const { container } = render(<NotFoundPage />);
    expect(container.firstChild.tagName).toBe('DIV');
  });
});
