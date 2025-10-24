import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route, MemoryRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';

const renderApp = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:restaurantName" element={<RestaurantPage />} />
        <Route path="/:restaurantName/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('App component', () => {
  it('should render Navbar on all pages', () => {
    renderApp('/');
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  describe('Routing', () => {
    it('should render HomePage at root path', () => {
      renderApp('/');
      expect(screen.getByRole('heading', { name: 'Welcome to Multi-Restaurant Platform' })).toBeInTheDocument();
    });

    it('should render RestaurantPage for pizza-hut', () => {
      renderApp('/pizza-hut');
      expect(screen.getByRole('heading', { name: 'pizza hut' })).toBeInTheDocument();
      expect(screen.getByText('Pepperoni Pizza')).toBeInTheDocument();
    });

    it('should render RestaurantPage for burger-king', () => {
      renderApp('/burger-king');
      expect(screen.getByRole('heading', { name: 'burger king' })).toBeInTheDocument();
      expect(screen.getByText('Whopper')).toBeInTheDocument();
    });

    it('should render RestaurantPage for dominos', () => {
      renderApp('/dominos');
      expect(screen.getByRole('heading', { name: 'dominos' })).toBeInTheDocument();
      expect(screen.getByText('Buffalo Wings')).toBeInTheDocument();
    });

    it('should render RestaurantPage for sushi-place', () => {
      renderApp('/sushi-place');
      expect(screen.getByRole('heading', { name: 'sushi place' })).toBeInTheDocument();
      expect(screen.getByText('Salmon Roll')).toBeInTheDocument();
    });

    it('should render AdminPage for restaurant admin route', () => {
      renderApp('/pizza-hut/admin');
      expect(screen.getByRole('heading', { name: 'Admin Login' })).toBeInTheDocument();
    });

    it('should render NotFoundPage for deeply nested unknown routes', () => {
      renderApp('/some/random/path');
      expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
    });

    it('should render restaurant page even for unknown restaurants', () => {
      // Note: The app currently renders RestaurantPage for any path matching /:restaurantName
      // This is expected behavior - it will show empty menu for unknown restaurants
      renderApp('/unknown-restaurant');
      expect(screen.getByRole('heading', { name: 'unknown restaurant' })).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('should have working navigation links in Navbar', () => {
      renderApp('/');
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });

    it('should show all restaurant links in Navbar', () => {
      renderApp('/');
      expect(screen.getByRole('link', { name: 'pizza hut' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'burger king' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'dominos' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'sushi place' })).toBeInTheDocument();
    });

    it('should show admin link in Navbar', () => {
      renderApp('/');
      expect(screen.getByRole('link', { name: 'Admin' })).toBeInTheDocument();
    });
  });

  describe('Page Content Persistence', () => {
    it('should maintain Navbar across different routes', () => {
      renderApp('/');
      const homeLinks = screen.getAllByRole('link', { name: 'Home' });
      expect(homeLinks.length).toBeGreaterThan(0);
      expect(homeLinks[0]).toBeInTheDocument();
    });

    it('should render different content on different routes', () => {
      renderApp('/');
      expect(screen.getByRole('heading', { name: 'Welcome to Multi-Restaurant Platform' })).toBeInTheDocument();
      
      renderApp('/pizza-hut');
      const allHeadings = screen.getAllByRole('heading');
      const pizzaHutHeading = allHeadings.find(h => h.textContent === 'pizza hut');
      expect(pizzaHutHeading).toBeInTheDocument();
    });
  });
});
