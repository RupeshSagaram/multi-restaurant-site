import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('HomePage component', () => {
  it('should render welcome heading', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByRole('heading', { name: 'Welcome to Multi-Restaurant Platform' })).toBeInTheDocument();
  });

  it('should render all restaurant cards', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText('pizza hut')).toBeInTheDocument();
    expect(screen.getByText('burger king')).toBeInTheDocument();
    expect(screen.getByText('dominos')).toBeInTheDocument();
    expect(screen.getByText('sushi place')).toBeInTheDocument();
  });

  it('should render View Menu links for each restaurant', () => {
    renderWithRouter(<HomePage />);
    const viewMenuLinks = screen.getAllByText('View Menu');
    expect(viewMenuLinks.length).toBe(4);
  });

  it('should have correct href for restaurant links', () => {
    renderWithRouter(<HomePage />);
    const links = screen.getAllByText('View Menu');
    expect(links[0].closest('a')).toHaveAttribute('href', '/pizza-hut');
    expect(links[1].closest('a')).toHaveAttribute('href', '/burger-king');
    expect(links[2].closest('a')).toHaveAttribute('href', '/dominos');
    expect(links[3].closest('a')).toHaveAttribute('href', '/sushi-place');
  });

  it('should render restaurant grid', () => {
    const { container } = renderWithRouter(<HomePage />);
    const grid = container.querySelector('.restaurant-grid');
    expect(grid).toBeInTheDocument();
  });

  it('should render correct number of restaurant cards', () => {
    const { container } = renderWithRouter(<HomePage />);
    const cards = container.querySelectorAll('.restaurant-card');
    expect(cards.length).toBe(4);
  });

  it('should render images for each restaurant', () => {
    const { container } = renderWithRouter(<HomePage />);
    const images = container.querySelectorAll('.restaurant-image img');
    expect(images.length).toBe(4);
  });

  it('should have correct alt text for images', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByAltText('pizza hut')).toBeInTheDocument();
    expect(screen.getByAltText('burger king')).toBeInTheDocument();
    expect(screen.getByAltText('dominos')).toBeInTheDocument();
    expect(screen.getByAltText('sushi place')).toBeInTheDocument();
  });

  it('should replace hyphens with spaces in restaurant names', () => {
    renderWithRouter(<HomePage />);
    // Names should be displayed with spaces, not hyphens
    expect(screen.getByText('pizza hut')).toBeInTheDocument();
    expect(screen.queryByText('pizza-hut')).not.toBeInTheDocument();
  });

  it('should render restaurant content sections', () => {
    const { container } = renderWithRouter(<HomePage />);
    const contentSections = container.querySelectorAll('.restaurant-content');
    expect(contentSections.length).toBe(4);
  });
});
