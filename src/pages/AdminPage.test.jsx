import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AdminPage from './AdminPage';

const renderWithRouter = (restaurantName) => {
  return render(
    <MemoryRouter initialEntries={[`/${restaurantName}/admin`]}>
      <Routes>
        <Route path="/:restaurantName/admin" element={<AdminPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('AdminPage component', () => {
  describe('Login State', () => {
    it('should render login form when not authenticated', () => {
      renderWithRouter('pizza-hut');
      expect(screen.getByRole('heading', { name: 'Admin Login' })).toBeInTheDocument();
    });

    it('should show login message', () => {
      renderWithRouter('pizza-hut');
      expect(screen.getByText('Please login to access the admin dashboard')).toBeInTheDocument();
    });

    it('should render username and password inputs', () => {
      renderWithRouter('pizza-hut');
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('should render login button', () => {
      renderWithRouter('pizza-hut');
      const buttons = screen.getAllByRole('button');
      const loginButton = buttons.find(btn => btn.textContent === 'Login');
      expect(loginButton).toBeInTheDocument();
    });

    it('should show admin dashboard after login', async () => {
      const user = userEvent.setup();
      renderWithRouter('pizza-hut');
      
      const loginButton = screen.getAllByRole('button').find(btn => btn.textContent === 'Login');
      await user.click(loginButton);
      
      expect(screen.getByRole('heading', { name: 'Admin Dashboard' })).toBeInTheDocument();
    });
  });

  describe('Admin Dashboard State', () => {
    const loginAndRender = async (restaurantName) => {
      const user = userEvent.setup();
      renderWithRouter(restaurantName);
      const loginButton = screen.getAllByRole('button').find(btn => btn.textContent === 'Login');
      await user.click(loginButton);
      return user;
    };

    it('should render admin dashboard heading', async () => {
      await loginAndRender('pizza-hut');
      expect(screen.getByRole('heading', { name: 'Admin Dashboard' })).toBeInTheDocument();
    });

    it('should render logout button', async () => {
      await loginAndRender('pizza-hut');
      expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
    });

    it('should display restaurant name', async () => {
      await loginAndRender('pizza-hut');
      expect(screen.getByText('pizza hut')).toBeInTheDocument();
    });

    it('should show Restaurant Details section', async () => {
      await loginAndRender('pizza-hut');
      expect(screen.getByRole('heading', { name: 'Restaurant Details' })).toBeInTheDocument();
    });

    it('should show Menu Management section', async () => {
      await loginAndRender('pizza-hut');
      expect(screen.getByRole('heading', { name: 'Menu Management' })).toBeInTheDocument();
    });

    it('should display admin info including Admin ID', async () => {
      await loginAndRender('pizza-hut');
      expect(screen.getByText('Admin ID:')).toBeInTheDocument();
      expect(screen.getByText('ADMIN001')).toBeInTheDocument();
    });

    it('should display status as Active', async () => {
      await loginAndRender('pizza-hut');
      expect(screen.getByText('Status:')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('should display total menu items count', async () => {
      await loginAndRender('pizza-hut');
      expect(screen.getByText('Total Menu Items:')).toBeInTheDocument();
    });

    it('should render admin form', async () => {
      await loginAndRender('pizza-hut');
      expect(screen.getByPlaceholderText('Item Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Price')).toBeInTheDocument();
    });

    it('should display current menu items', async () => {
      await loginAndRender('pizza-hut');
      expect(screen.getByText('Pepperoni Pizza')).toBeInTheDocument();
      expect(screen.getByText('Veggie Pizza')).toBeInTheDocument();
    });

    it('should render Back to Restaurant button', async () => {
      await loginAndRender('pizza-hut');
      expect(screen.getByRole('button', { name: 'Back to Restaurant' })).toBeInTheDocument();
    });

    it('should allow adding a new menu item', async () => {
      const user = await loginAndRender('pizza-hut');
      
      await user.type(screen.getByPlaceholderText('Item Name'), 'New Item');
      await user.type(screen.getByPlaceholderText('Description'), 'New Description');
      await user.type(screen.getByPlaceholderText('Price'), '20');
      
      const addButton = screen.getByRole('button', { name: 'Add Item' });
      await user.click(addButton);
      
      expect(screen.getByText('New Item')).toBeInTheDocument();
    });

    it('should logout when logout button is clicked', async () => {
      const user = await loginAndRender('pizza-hut');
      
      const logoutButton = screen.getByRole('button', { name: 'Logout' });
      await user.click(logoutButton);
      
      expect(screen.getByRole('heading', { name: 'Admin Login' })).toBeInTheDocument();
    });
  });
});
