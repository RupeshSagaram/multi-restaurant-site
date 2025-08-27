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
    let username, password;
    return (
      <div>
        <h3>Admin Login</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(username.value, password.value);
          }}
        >
          <input ref={(ref) => (username = ref)} placeholder="Username" />
          <input
            ref={(ref) => (password = ref)}
            placeholder="Password"
            type="password"
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h3>Admin Dashboard for {restaurantName.replace(/-/g, " ")}</h3>
      <Button onClick={logout}>Logout</Button>
      <AdminForm onAddMenuItem={addMenuItem} />
      <h4>Current Menu:</h4>
      <MenuList menu={menu} />
      <Button onClick={() => navigate(`/${restaurantName}`)}>Back to Restaurant</Button>
    </div>
  );
};

export default AdminPage;