import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RestaurantPage from './RestaurantPage';

const renderWithRouter = (restaurantName) => {
  return render(
    <MemoryRouter initialEntries={[`/${restaurantName}`]}>
      <Routes>
        <Route path="/:restaurantName" element={<RestaurantPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('RestaurantPage component', () => {
  it('should render restaurant name for pizza-hut', () => {
    renderWithRouter('pizza-hut');
    expect(screen.getByRole('heading', { name: 'pizza hut' })).toBeInTheDocument();
  });

  it('should render restaurant name for burger-king', () => {
    renderWithRouter('burger-king');
    expect(screen.getByRole('heading', { name: 'burger king' })).toBeInTheDocument();
  });

  it('should display menu items for pizza-hut', () => {
    renderWithRouter('pizza-hut');
    expect(screen.getByText('Pepperoni Pizza')).toBeInTheDocument();
    expect(screen.getByText('Veggie Pizza')).toBeInTheDocument();
  });

  it('should display menu items for burger-king', () => {
    renderWithRouter('burger-king');
    expect(screen.getByText('Whopper')).toBeInTheDocument();
    expect(screen.getByText('Fries')).toBeInTheDocument();
  });

  it('should render Admin button', () => {
    renderWithRouter('pizza-hut');
    expect(screen.getByRole('button', { name: 'Admin' })).toBeInTheDocument();
  });

  it('should replace hyphens with spaces in restaurant name', () => {
    renderWithRouter('sushi-place');
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('sushi place');
    expect(heading).not.toHaveTextContent('sushi-place');
  });

  it('should render menu with prices', () => {
    renderWithRouter('dominos');
    expect(screen.getByText('$14')).toBeInTheDocument();
    expect(screen.getByText('$8')).toBeInTheDocument();
  });

  it('should render menu descriptions', () => {
    renderWithRouter('sushi-place');
    expect(screen.getByText('Fresh salmon')).toBeInTheDocument();
    expect(screen.getByText('Veggie roll')).toBeInTheDocument();
  });
});
