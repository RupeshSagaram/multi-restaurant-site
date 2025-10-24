import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navbar component', () => {
  it('should render Home link', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('should render links for all restaurants', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole('link', { name: 'pizza hut' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'burger king' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'dominos' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'sushi place' })).toBeInTheDocument();
  });

  it('should render Admin link', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole('link', { name: 'Admin' })).toBeInTheDocument();
  });

  it('should have correct href for Home link', () => {
    renderWithRouter(<Navbar />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should have correct href for restaurant links', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole('link', { name: 'pizza hut' })).toHaveAttribute('href', '/pizza-hut');
    expect(screen.getByRole('link', { name: 'burger king' })).toHaveAttribute('href', '/burger-king');
    expect(screen.getByRole('link', { name: 'dominos' })).toHaveAttribute('href', '/dominos');
    expect(screen.getByRole('link', { name: 'sushi place' })).toHaveAttribute('href', '/sushi-place');
  });

  it('should have correct href for Admin link', () => {
    renderWithRouter(<Navbar />);
    const adminLink = screen.getByRole('link', { name: 'Admin' });
    expect(adminLink).toHaveAttribute('href', '/pizza-hut/admin');
  });

  it('should render nav element', () => {
    const { container } = renderWithRouter(<Navbar />);
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });

  it('should replace hyphens with spaces in restaurant names', () => {
    renderWithRouter(<Navbar />);
    // Original names have hyphens, displayed names should have spaces
    expect(screen.getByRole('link', { name: 'pizza hut' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'burger king' })).toBeInTheDocument();
  });

  it('should render correct total number of links', () => {
    renderWithRouter(<Navbar />);
    const links = screen.getAllByRole('link');
    // 1 Home + 4 Restaurants + 1 Admin = 6 links
    expect(links.length).toBe(6);
  });
});
