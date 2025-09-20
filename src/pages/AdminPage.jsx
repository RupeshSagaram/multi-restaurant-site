import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMenuManager } from "../logic/useMenuManager.js";
import { useAuth } from "../logic/useAuth";
import AdminForm from "../components/AdminForm";
import MenuList from "../components/MenuList";
import Button from "../components/Button";

const AdminPage = () => {
  const { restaurantName } = useParams();
  const { menu, addMenuItem } = useMenuManager(restaurantName);
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    // Dummy login UI
    let USERNAME_REF, PASSWORD_REF;
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h3>Admin Login</h3>
          <p>Please login to access the admin dashboard</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <input ref={(ref) => (USERNAME_REF = ref)} placeholder="Username" />
            <input
              ref={(ref) => (PASSWORD_REF = ref)}
              placeholder="Password"
              type="password"
            />
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <div className="admin-header-actions">
          <Button onClick={logout} className="logout-btn">Logout</Button>
        </div>
      </div>
      
      <div className="admin-details-section">
        <h3>Restaurant Details</h3>
        <div className="admin-info-card">
          <div className="admin-info-item">
            <label>Restaurant Name:</label>
            <span>{restaurantName ? restaurantName.replace(/-/g, " ") : "N/A"}</span>
          </div>
          <div className="admin-info-item">
            <label>Admin ID:</label>
            <span>ADMIN001</span>
          </div>
          <div className="admin-info-item">
            <label>Total Menu Items:</label>
            <span>{menu.length}</span>
          </div>
          <div className="admin-info-item">
            <label>Status:</label>
            <span className="status-active">Active</span>
          </div>
        </div>
      </div>

      <div className="admin-menu-section">
        <h3>Menu Management</h3>
        <div className="admin-form-container">
          <AdminForm onAddMenuItem={addMenuItem} />
        </div>
        
        <div className="current-menu-container">
          <h4>Current Menu Items ({menu.length})</h4>
          <MenuList menu={menu} />
        </div>
      </div>

      <div className="admin-actions">
        <Button onClick={() => navigate(`/${restaurantName}`)} className="back-btn">
          Back to Restaurant
        </Button>
      </div>
    </div>
  );
};

export default AdminPage;